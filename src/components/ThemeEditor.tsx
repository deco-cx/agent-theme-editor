import React, { useEffect, useState } from "react";
import { Theme } from "../types/Theme";
import { ValidationError } from "../types/ValidationError";
import { ColorInput } from "./inputs/ColorInput";
import { TextInput } from "./inputs/TextInput";
import { Section } from "./inputs/Section";
import { Button } from "./ui/button";

interface ThemeEditorProps {
    theme: Theme;
    onThemeChange: (theme: Theme) => void;
    onSaveComplete?: () => void;
    isSaving?: boolean;
}

export const ThemeEditor: React.FC<ThemeEditorProps> = ({
    theme,
    onThemeChange,
    onSaveComplete,
    isSaving = false,
}) => {
    const [localTheme, setLocalTheme] = useState<Theme>(theme);
    const [errors, setErrors] = useState<ValidationError[]>([]);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        setLocalTheme(theme);
        setErrors([]);
        setHasChanges(false);
    }, [theme]);

    const handleValueChange = (
        path: string[],
        value: string | string[] | number | boolean,
    ) => {
        const newTheme = { ...localTheme };
        let current = newTheme as {
            font?: {
                googleFonts?: string[];
            };
            typography?: {
                fonts?: {
                    primary?: {
                        family?: string;
                        weights?: string[];
                    };
                    secondary?: {
                        family?: string;
                        weights?: string[];
                    };
                };
            };
            [key: string]: unknown;
        };

        // Special handling for Google Fonts
        if (path[0] === "font" && path[1] === "googleFonts") {
            // Update font.googleFonts
            if (!current.font) current.font = {};
            current.font.googleFonts = value as string[];

            // Update typography.fonts
            if (!current.typography) current.typography = {};
            if (!current.typography.fonts) current.typography.fonts = {};

            // Update primary and secondary fonts based on the Google Fonts list
            if (Array.isArray(value) && value[0]) {
                if (!current.typography.fonts.primary) {
                    current.typography.fonts.primary = {};
                }
                current.typography.fonts.primary.family = value[0];
                if (!current.typography.fonts.primary.weights) {
                    current.typography.fonts.primary.weights = ["400"];
                }
            }
            if (Array.isArray(value) && value[1]) {
                if (!current.typography.fonts.secondary) {
                    current.typography.fonts.secondary = {};
                }
                current.typography.fonts.secondary.family = value[1];
                if (!current.typography.fonts.secondary.weights) {
                    current.typography.fonts.secondary.weights = ["400"];
                }
            }
        } else {
            // Navigate to the parent object of where we want to set the value
            for (let i = 0; i < path.length - 1; i++) {
                if (!(path[i] in current)) {
                    current[path[i]] = {};
                }
                current = current[path[i]] as Record<string, unknown>;
            }

            // Set the value
            current[path[path.length - 1]] = value;
        }

        // Sempre marcar como tendo mudanças quando o usuário faz alterações
        setLocalTheme(newTheme as Theme);
        setHasChanges(true);
        // Nota: Não estamos chamando onThemeChange aqui para permitir que o usuário
        // salve explicitamente as alterações usando o botão "Save Changes"
    };

    const handleError = (error: ValidationError | null) => {
        if (error === null) {
            return;
        }
        setErrors((prevErrors) => {
            const newErrors = [...prevErrors];
            const index = newErrors.findIndex(
                (e) => JSON.stringify(e.path) === JSON.stringify(error.path),
            );
            if (index >= 0) {
                newErrors[index] = error;
            } else {
                newErrors.push(error);
            }
            return newErrors;
        });
    };

    const getError = (path: string[]): ValidationError | null => {
        return errors.find(
            (error) => JSON.stringify(error.path) === JSON.stringify(path),
        ) || null;
    };

    const handleSave = () => {
        if (errors.length > 0) return;
        onThemeChange(localTheme);
        setHasChanges(false);

        // Após salvar, navegue para a aba de preview
        if (onSaveComplete) {
            onSaveComplete();
        }
    };

    return (
        <div className="w-full bg-emerald-50/30">
            <div className="sticky top-0 z-10 p-6 bg-white flex items-center justify-end border-b border-emerald-100 shadow-sm">
                <Button
                    onClick={handleSave}
                    disabled={!hasChanges || errors.length > 0 || isSaving}
                    className={`${
                        !hasChanges || errors.length > 0 || isSaving
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-emerald-600 text-white hover:bg-emerald-700"
                    }`}
                    variant={!hasChanges || errors.length > 0 || isSaving
                        ? "outline"
                        : "default"}
                >
                    {isSaving ? "Saving..." : "Save Changes"}
                </Button>
            </div>

            <div className="p-6 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-emerald-200 hover:[&::-webkit-scrollbar-thumb]:bg-emerald-300 [&::-webkit-scrollbar-thumb]:rounded-full">
                <div className="w-full max-w-5xl mx-auto space-y-6">
                    <Section
                        title="Main Colors"
                        description="Define your theme's main color palette"
                        defaultOpen={true}
                    >
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            <ColorInput
                                label="Base"
                                value={localTheme.colors?.main?.base || ""}
                                path={["colors", "main", "base"]}
                                onValueChange={handleValueChange}
                                onError={handleError}
                                getError={getError}
                            />
                            <ColorInput
                                label="Primary"
                                value={localTheme.colors?.main?.primary || ""}
                                path={["colors", "main", "primary"]}
                                onValueChange={handleValueChange}
                                onError={handleError}
                                getError={getError}
                            />
                            <ColorInput
                                label="Secondary"
                                value={localTheme.colors?.main?.secondary || ""}
                                path={["colors", "main", "secondary"]}
                                onValueChange={handleValueChange}
                                onError={handleError}
                                getError={getError}
                            />
                            <ColorInput
                                label="Accent"
                                value={localTheme.colors?.main?.accent || ""}
                                path={["colors", "main", "accent"]}
                                onValueChange={handleValueChange}
                                onError={handleError}
                                getError={getError}
                            />
                            <ColorInput
                                label="Neutral"
                                value={localTheme.colors?.main?.neutral || ""}
                                path={["colors", "main", "neutral"]}
                                onValueChange={handleValueChange}
                                onError={handleError}
                                getError={getError}
                            />
                            <ColorInput
                                label="Success"
                                value={localTheme.colors?.main?.success || ""}
                                path={["colors", "main", "success"]}
                                onValueChange={handleValueChange}
                                onError={handleError}
                                getError={getError}
                            />
                            <ColorInput
                                label="Warning"
                                value={localTheme.colors?.main?.warning || ""}
                                path={["colors", "main", "warning"]}
                                onValueChange={handleValueChange}
                                onError={handleError}
                                getError={getError}
                            />
                            <ColorInput
                                label="Error"
                                value={localTheme.colors?.main?.error || ""}
                                path={["colors", "main", "error"]}
                                onValueChange={handleValueChange}
                                onError={handleError}
                                getError={getError}
                            />
                            <ColorInput
                                label="Info"
                                value={localTheme.colors?.main?.info || ""}
                                path={["colors", "main", "info"]}
                                onValueChange={handleValueChange}
                                onError={handleError}
                                getError={getError}
                            />
                        </div>
                    </Section>

                    <Section
                        title="Complementary Colors"
                        description="These will be auto-generated to a readable color if not set"
                        defaultOpen={false}
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <ColorInput
                                label="Base-200"
                                value={localTheme.colors?.complementary
                                    ?.base200 || ""}
                                path={["colors", "complementary", "base200"]}
                                onValueChange={handleValueChange}
                                onError={handleError}
                                getError={getError}
                            />
                            <ColorInput
                                label="Base-300"
                                value={localTheme.colors?.complementary
                                    ?.base300 || ""}
                                path={["colors", "complementary", "base300"]}
                                onValueChange={handleValueChange}
                                onError={handleError}
                                getError={getError}
                            />
                            <ColorInput
                                label="Base Content"
                                value={localTheme.colors?.complementary
                                    ?.baseContent || ""}
                                path={[
                                    "colors",
                                    "complementary",
                                    "baseContent",
                                ]}
                                onValueChange={handleValueChange}
                                onError={handleError}
                                getError={getError}
                            />
                            <ColorInput
                                label="Primary Content"
                                value={localTheme.colors?.complementary
                                    ?.primaryContent || ""}
                                path={[
                                    "colors",
                                    "complementary",
                                    "primaryContent",
                                ]}
                                onValueChange={handleValueChange}
                                onError={handleError}
                                getError={getError}
                            />
                            <ColorInput
                                label="Secondary Content"
                                value={localTheme.colors?.complementary
                                    ?.secondaryContent || ""}
                                path={[
                                    "colors",
                                    "complementary",
                                    "secondaryContent",
                                ]}
                                onValueChange={handleValueChange}
                                onError={handleError}
                                getError={getError}
                            />
                            <ColorInput
                                label="Accent Content"
                                value={localTheme.colors?.complementary
                                    ?.accentContent || ""}
                                path={[
                                    "colors",
                                    "complementary",
                                    "accentContent",
                                ]}
                                onValueChange={handleValueChange}
                                onError={handleError}
                                getError={getError}
                            />
                            <ColorInput
                                label="Neutral Content"
                                value={localTheme.colors?.complementary
                                    ?.neutralContent || ""}
                                path={[
                                    "colors",
                                    "complementary",
                                    "neutralContent",
                                ]}
                                onValueChange={handleValueChange}
                                onError={handleError}
                                getError={getError}
                            />
                            <ColorInput
                                label="Success Content"
                                value={localTheme.colors?.complementary
                                    ?.successContent || ""}
                                path={[
                                    "colors",
                                    "complementary",
                                    "successContent",
                                ]}
                                onValueChange={handleValueChange}
                                onError={handleError}
                                getError={getError}
                            />
                            <ColorInput
                                label="Warning Content"
                                value={localTheme.colors?.complementary
                                    ?.warningContent || ""}
                                path={[
                                    "colors",
                                    "complementary",
                                    "warningContent",
                                ]}
                                onValueChange={handleValueChange}
                                onError={handleError}
                                getError={getError}
                            />
                            <ColorInput
                                label="Error Content"
                                value={localTheme.colors?.complementary
                                    ?.errorContent || ""}
                                path={[
                                    "colors",
                                    "complementary",
                                    "errorContent",
                                ]}
                                onValueChange={handleValueChange}
                                onError={handleError}
                                getError={getError}
                            />
                            <ColorInput
                                label="Info Content"
                                value={localTheme.colors?.complementary
                                    ?.infoContent || ""}
                                path={[
                                    "colors",
                                    "complementary",
                                    "infoContent",
                                ]}
                                onValueChange={handleValueChange}
                                onError={handleError}
                                getError={getError}
                            />
                        </div>
                    </Section>

                    <Section
                        title="Button Style"
                        description="Configure button appearance"
                        defaultOpen={false}
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <TextInput
                                label="Border width"
                                value={localTheme.button?.borderWidth || ""}
                                path={["button", "borderWidth"]}
                                onValueChange={handleValueChange}
                                onError={handleError}
                                getError={getError}
                                placeholder="1px"
                            />
                            <TextInput
                                label="Radius"
                                value={localTheme.button?.radius || ""}
                                path={["button", "radius"]}
                                onValueChange={handleValueChange}
                                onError={handleError}
                                getError={getError}
                                placeholder="0.2rem"
                            />
                            <TextInput
                                label="Scale on click"
                                value={localTheme.button?.clickScale || ""}
                                path={["button", "clickScale"]}
                                onValueChange={handleValueChange}
                                onError={handleError}
                                getError={getError}
                                placeholder="0.95"
                            />
                            <TextInput
                                label="Animation Duration"
                                value={localTheme.button?.clickDuration || ""}
                                path={["button", "clickDuration"]}
                                onValueChange={handleValueChange}
                                onError={handleError}
                                getError={getError}
                                placeholder="0.25s"
                            />
                        </div>
                    </Section>

                    <Section
                        title="Font"
                        description="Configure font settings"
                        defaultOpen={false}
                    >
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium">
                                    Google Fonts
                                </h4>
                                <Button
                                    onClick={() => {
                                        const fonts =
                                            localTheme.font?.googleFonts || [];
                                        handleValueChange([
                                            "font",
                                            "googleFonts",
                                        ], [...fonts, ""]);
                                    }}
                                    className="px-2 py-1 text-sm bg-emerald-600 text-white rounded hover:bg-emerald-700"
                                    size="sm"
                                >
                                    Add Font
                                </Button>
                            </div>
                            <div className="space-y-2">
                                {Array.isArray(localTheme.font?.googleFonts)
                                    ? (localTheme.font.googleFonts.map((
                                        font: string,
                                        index: number,
                                    ) => (
                                        <div key={index} className="flex gap-2">
                                            <TextInput
                                                label={`Font ${index + 1}`}
                                                value={font}
                                                path={["font", "googleFonts"]}
                                                onValueChange={(
                                                    path,
                                                    value,
                                                ) => {
                                                    const fonts = [
                                                        ...(localTheme.font
                                                            ?.googleFonts ||
                                                            []),
                                                    ];
                                                    fonts[index] = value;
                                                    handleValueChange(
                                                        path,
                                                        fonts.filter(Boolean),
                                                    );
                                                }}
                                                onError={handleError}
                                                getError={getError}
                                                placeholder="Albert Sans"
                                            />
                                            {index > 0 && (
                                                <Button
                                                    onClick={() => {
                                                        const fonts = [
                                                            ...(localTheme.font
                                                                ?.googleFonts ||
                                                                []),
                                                        ];
                                                        fonts.splice(index, 1);
                                                        handleValueChange([
                                                            "font",
                                                            "googleFonts",
                                                        ], fonts);
                                                    }}
                                                    className="self-end h-10 px-2 py-1 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100"
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    Remove
                                                </Button>
                                            )}
                                        </div>
                                    )))
                                    : (
                                        <div className="flex gap-2">
                                            <TextInput
                                                label="Font 1"
                                                value=""
                                                path={["font", "googleFonts"]}
                                                onValueChange={(
                                                    path,
                                                    value,
                                                ) => {
                                                    handleValueChange(path, [
                                                        value,
                                                    ]);
                                                }}
                                                onError={handleError}
                                                getError={getError}
                                                placeholder="Albert Sans"
                                            />
                                        </div>
                                    )}
                            </div>
                        </div>
                    </Section>

                    <Section
                        title="Other Styles"
                        description="Configure additional styling options"
                        defaultOpen={false}
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <TextInput
                                label="Rounded box"
                                value={localTheme.styles?.roundedBox || ""}
                                path={["styles", "roundedBox"]}
                                onValueChange={handleValueChange}
                                onError={handleError}
                                getError={getError}
                                placeholder="1rem"
                            />
                            <TextInput
                                label="Rounded badge"
                                value={localTheme.styles?.roundedBadge || ""}
                                path={["styles", "roundedBadge"]}
                                onValueChange={handleValueChange}
                                onError={handleError}
                                getError={getError}
                                placeholder="1.9rem"
                            />
                            <TextInput
                                label="Animation input"
                                value={localTheme.styles?.animationInput || ""}
                                path={["styles", "animationInput"]}
                                onValueChange={handleValueChange}
                                onError={handleError}
                                getError={getError}
                                placeholder="0.2s"
                            />
                            <TextInput
                                label="Tab border"
                                value={localTheme.styles?.tabBorder || ""}
                                path={["styles", "tabBorder"]}
                                onValueChange={handleValueChange}
                                onError={handleError}
                                getError={getError}
                                placeholder="1px"
                            />
                            <TextInput
                                label="Tab radius"
                                value={localTheme.styles?.tabRadius || ""}
                                path={["styles", "tabRadius"]}
                                onValueChange={handleValueChange}
                                onError={handleError}
                                getError={getError}
                                placeholder="0.5rem"
                            />
                        </div>
                    </Section>

                    <Section
                        title="Spacing"
                        description="Configure spacing scale and values"
                        defaultOpen={false}
                    >
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <TextInput
                                    label="Base Unit"
                                    value={localTheme.spacing?.unit || ""}
                                    path={["spacing", "unit"]}
                                    onValueChange={handleValueChange}
                                    onError={handleError}
                                    getError={getError}
                                    placeholder="4px"
                                />
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-sm font-medium">Scale</h4>
                                <div className="grid grid-cols-4 gap-4">
                                    {Array.isArray(localTheme.spacing?.scale) &&
                                        localTheme.spacing.scale.map((
                                            value: string,
                                            index: number,
                                        ) => (
                                            <TextInput
                                                key={index}
                                                label={`Scale ${index + 1}`}
                                                value={value}
                                                path={[
                                                    "spacing",
                                                    "scale",
                                                    index.toString(),
                                                ]}
                                                onValueChange={(
                                                    newValue,
                                                ) => {
                                                    const scale = [
                                                        ...(localTheme.spacing
                                                            ?.scale || []),
                                                    ];
                                                    // @ts-expect-error - its ok
                                                    scale[index] = newValue;
                                                    handleValueChange([
                                                        "spacing",
                                                        "scale",
                                                    ], scale);
                                                }}
                                                onError={handleError}
                                                getError={getError}
                                                placeholder={`${
                                                    4 * (index + 1)
                                                }px`}
                                            />
                                        ))}
                                </div>
                            </div>
                        </div>
                    </Section>

                    <Section
                        title="Borders"
                        description="Configure border styles"
                        defaultOpen={false}
                    >
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <h4 className="text-sm font-medium">
                                    Border Width
                                </h4>
                                <div className="grid grid-cols-3 gap-4">
                                    <TextInput
                                        label="Thin"
                                        value={localTheme.borders?.width
                                            ?.thin || ""}
                                        path={["borders", "width", "thin"]}
                                        onValueChange={handleValueChange}
                                        onError={handleError}
                                        getError={getError}
                                        placeholder="1px"
                                    />
                                    <TextInput
                                        label="Medium"
                                        value={localTheme.borders?.width
                                            ?.medium || ""}
                                        path={["borders", "width", "medium"]}
                                        onValueChange={handleValueChange}
                                        onError={handleError}
                                        getError={getError}
                                        placeholder="2px"
                                    />
                                    <TextInput
                                        label="Thick"
                                        value={localTheme.borders?.width
                                            ?.thick || ""}
                                        path={["borders", "width", "thick"]}
                                        onValueChange={handleValueChange}
                                        onError={handleError}
                                        getError={getError}
                                        placeholder="4px"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-sm font-medium">
                                    Border Style
                                </h4>
                                <div className="grid grid-cols-3 gap-4">
                                    <TextInput
                                        label="Solid"
                                        value={localTheme.borders?.style
                                            ?.solid || ""}
                                        path={["borders", "style", "solid"]}
                                        onValueChange={handleValueChange}
                                        onError={handleError}
                                        getError={getError}
                                        placeholder="solid"
                                    />
                                    <TextInput
                                        label="Dashed"
                                        value={localTheme.borders?.style
                                            ?.dashed || ""}
                                        path={["borders", "style", "dashed"]}
                                        onValueChange={handleValueChange}
                                        onError={handleError}
                                        getError={getError}
                                        placeholder="dashed"
                                    />
                                    <TextInput
                                        label="Dotted"
                                        value={localTheme.borders?.style
                                            ?.dotted || ""}
                                        path={["borders", "style", "dotted"]}
                                        onValueChange={handleValueChange}
                                        onError={handleError}
                                        getError={getError}
                                        placeholder="dotted"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-sm font-medium">
                                    Border Radius
                                </h4>
                                <div className="grid grid-cols-3 gap-4">
                                    <TextInput
                                        label="None"
                                        value={localTheme.borders?.radius
                                            ?.none || ""}
                                        path={["borders", "radius", "none"]}
                                        onValueChange={handleValueChange}
                                        onError={handleError}
                                        getError={getError}
                                        placeholder="0"
                                    />
                                    <TextInput
                                        label="Small"
                                        value={localTheme.borders?.radius?.sm ||
                                            ""}
                                        path={["borders", "radius", "sm"]}
                                        onValueChange={handleValueChange}
                                        onError={handleError}
                                        getError={getError}
                                        placeholder="0.125rem"
                                    />
                                    <TextInput
                                        label="Medium"
                                        value={localTheme.borders?.radius?.md ||
                                            ""}
                                        path={["borders", "radius", "md"]}
                                        onValueChange={handleValueChange}
                                        onError={handleError}
                                        getError={getError}
                                        placeholder="0.375rem"
                                    />
                                    <TextInput
                                        label="Large"
                                        value={localTheme.borders?.radius?.lg ||
                                            ""}
                                        path={["borders", "radius", "lg"]}
                                        onValueChange={handleValueChange}
                                        onError={handleError}
                                        getError={getError}
                                        placeholder="0.5rem"
                                    />
                                    <TextInput
                                        label="Full"
                                        value={localTheme.borders?.radius
                                            ?.full || ""}
                                        path={["borders", "radius", "full"]}
                                        onValueChange={handleValueChange}
                                        onError={handleError}
                                        getError={getError}
                                        placeholder="9999px"
                                    />
                                </div>
                            </div>
                        </div>
                    </Section>

                    <Section
                        title="Shadows"
                        description="Configure shadow styles"
                        defaultOpen={false}
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <TextInput
                                label="Small"
                                value={localTheme.shadows?.sm || ""}
                                path={["shadows", "sm"]}
                                onValueChange={handleValueChange}
                                onError={handleError}
                                getError={getError}
                                placeholder="0 1px 2px 0 rgba(0, 0, 0, 0.05)"
                            />
                            <TextInput
                                label="Medium"
                                value={localTheme.shadows?.md || ""}
                                path={["shadows", "md"]}
                                onValueChange={handleValueChange}
                                onError={handleError}
                                getError={getError}
                                placeholder="0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                            />
                            <TextInput
                                label="Large"
                                value={localTheme.shadows?.lg || ""}
                                path={["shadows", "lg"]}
                                onValueChange={handleValueChange}
                                onError={handleError}
                                getError={getError}
                                placeholder="0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                            />
                            <TextInput
                                label="Extra Large"
                                value={localTheme.shadows?.xl || ""}
                                path={["shadows", "xl"]}
                                onValueChange={handleValueChange}
                                onError={handleError}
                                getError={getError}
                                placeholder="0 20px 25px -5px rgba(0, 0, 0, 0.1)"
                            />
                            <TextInput
                                label="Inner"
                                value={localTheme.shadows?.inner || ""}
                                path={["shadows", "inner"]}
                                onValueChange={handleValueChange}
                                onError={handleError}
                                getError={getError}
                                placeholder="inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)"
                            />
                        </div>
                    </Section>

                    <Section
                        title="Transitions"
                        description="Configure animation and transition effects"
                        defaultOpen={false}
                    >
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <h4 className="text-sm font-medium">
                                    Transition
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <TextInput
                                        label="Duration"
                                        value={localTheme.effects?.transition
                                            ?.duration || ""}
                                        path={[
                                            "effects",
                                            "transition",
                                            "duration",
                                        ]}
                                        onValueChange={handleValueChange}
                                        onError={handleError}
                                        getError={getError}
                                        placeholder="150ms"
                                    />
                                    <TextInput
                                        label="Timing"
                                        value={localTheme.effects?.transition
                                            ?.timing || ""}
                                        path={[
                                            "effects",
                                            "transition",
                                            "timing",
                                        ]}
                                        onValueChange={handleValueChange}
                                        onError={handleError}
                                        getError={getError}
                                        placeholder="ease-in-out"
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-sm font-medium">Opacity</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <TextInput
                                        label="Hover"
                                        value={localTheme.effects?.opacity
                                            ?.hover || ""}
                                        path={["effects", "opacity", "hover"]}
                                        onValueChange={handleValueChange}
                                        onError={handleError}
                                        getError={getError}
                                        placeholder="0.8"
                                    />
                                    <TextInput
                                        label="Disabled"
                                        value={localTheme.effects?.opacity
                                            ?.disabled || ""}
                                        path={[
                                            "effects",
                                            "opacity",
                                            "disabled",
                                        ]}
                                        onValueChange={handleValueChange}
                                        onError={handleError}
                                        getError={getError}
                                        placeholder="0.5"
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-sm font-medium">Blur</h4>
                                <div className="grid grid-cols-3 gap-4">
                                    <TextInput
                                        label="Small"
                                        value={localTheme.effects?.blur?.sm ||
                                            ""}
                                        path={["effects", "blur", "sm"]}
                                        onValueChange={handleValueChange}
                                        onError={handleError}
                                        getError={getError}
                                        placeholder="4px"
                                    />
                                    <TextInput
                                        label="Medium"
                                        value={localTheme.effects?.blur?.md ||
                                            ""}
                                        path={["effects", "blur", "md"]}
                                        onValueChange={handleValueChange}
                                        onError={handleError}
                                        getError={getError}
                                        placeholder="8px"
                                    />
                                    <TextInput
                                        label="Large"
                                        value={localTheme.effects?.blur?.lg ||
                                            ""}
                                        path={["effects", "blur", "lg"]}
                                        onValueChange={handleValueChange}
                                        onError={handleError}
                                        getError={getError}
                                        placeholder="16px"
                                    />
                                </div>
                            </div>
                        </div>
                    </Section>

                    <Section
                        title="Breakpoints"
                        description="Set responsive breakpoints"
                        defaultOpen={false}
                    >
                        <div className="space-y-6">
                            <div className="grid grid-cols-3 gap-4">
                                <TextInput
                                    label="Small (sm)"
                                    value={localTheme.breakpoints?.sm || ""}
                                    path={["breakpoints", "sm"]}
                                    onValueChange={handleValueChange}
                                    onError={handleError}
                                    getError={getError}
                                    placeholder="640px"
                                />
                                <TextInput
                                    label="Medium (md)"
                                    value={localTheme.breakpoints?.md || ""}
                                    path={["breakpoints", "md"]}
                                    onValueChange={handleValueChange}
                                    onError={handleError}
                                    getError={getError}
                                    placeholder="768px"
                                />
                                <TextInput
                                    label="Large (lg)"
                                    value={localTheme.breakpoints?.lg || ""}
                                    path={["breakpoints", "lg"]}
                                    onValueChange={handleValueChange}
                                    onError={handleError}
                                    getError={getError}
                                    placeholder="1024px"
                                />
                                <TextInput
                                    label="Extra Large (xl)"
                                    value={localTheme.breakpoints?.xl || ""}
                                    path={["breakpoints", "xl"]}
                                    onValueChange={handleValueChange}
                                    onError={handleError}
                                    getError={getError}
                                    placeholder="1280px"
                                />
                                <TextInput
                                    label="2XL"
                                    value={localTheme.breakpoints?.["2xl"] ||
                                        ""}
                                    path={["breakpoints", "2xl"]}
                                    onValueChange={handleValueChange}
                                    onError={handleError}
                                    getError={getError}
                                    placeholder="1536px"
                                />
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-sm font-medium">
                                    Max Widths
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <TextInput
                                        label="Container"
                                        value={localTheme.breakpoints?.maxWidths
                                            ?.container || ""}
                                        path={[
                                            "breakpoints",
                                            "maxWidths",
                                            "container",
                                        ]}
                                        onValueChange={handleValueChange}
                                        onError={handleError}
                                        getError={getError}
                                        placeholder="1280px"
                                    />
                                    <TextInput
                                        label="Content"
                                        value={localTheme.breakpoints?.maxWidths
                                            ?.content || ""}
                                        path={[
                                            "breakpoints",
                                            "maxWidths",
                                            "content",
                                        ]}
                                        onValueChange={handleValueChange}
                                        onError={handleError}
                                        getError={getError}
                                        placeholder="65ch"
                                    />
                                </div>
                            </div>
                        </div>
                    </Section>
                </div>
            </div>
        </div>
    );
};

export default ThemeEditor;
