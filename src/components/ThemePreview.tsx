import React from "react";
import { Theme } from "../types/Theme";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";

interface ThemePreviewProps {
    theme: Theme;
}

export const ThemePreview: React.FC<ThemePreviewProps> = ({ theme }) => {
    // Helper function to get font family string
    const getFontFamily = (type: "primary" | "secondary") => {
        const font = theme.typography?.fonts?.[type]?.family;
        // Only add quotes if the font name has spaces
        const formattedFont = font?.includes(" ") ? `"${font}"` : font;
        return formattedFont ? `${formattedFont}, sans-serif` : "sans-serif";
    };

    // Helper function to get color with fallback
    const getColor = (path: string[]): string | undefined => {
        let current: unknown = theme;
        for (const key of path) {
            if (typeof current !== "object" || current === null) {
                return undefined;
            }
            current = (current as { [key: string]: unknown })[key];
        }
        return current as string | undefined;
    };

    return (
        <div className="w-full bg-white overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-emerald-200 hover:[&::-webkit-scrollbar-thumb]:bg-emerald-300 [&::-webkit-scrollbar-thumb]:rounded-full">
            <div className="p-8 space-y-8 max-w-6xl mx-auto">
                <div>
                    <h2 className="text-lg font-semibold">Theme Preview</h2>
                    <p
                        className="text-sm mt-1"
                        style={{
                            color: getColor([
                                "colors",
                                "complementary",
                                "baseContent",
                            ]),
                        }}
                    >
                        See how your theme looks on common UI elements
                    </p>
                </div>

                {/* Typography */}
                <div className="space-y-4">
                    <h3 className="font-medium">Typography</h3>
                    <Card
                        style={{
                            backgroundColor: getColor([
                                "colors",
                                "complementary",
                                "base200",
                            ]) || "#f8f9fa",
                        }}
                        className="p-0 py-3"
                    >
                        <CardContent className="space-y-4">
                            <h1
                                className="text-4xl font-bold"
                                style={{
                                    fontFamily: getFontFamily("primary"),
                                    color: getColor([
                                        "colors",
                                        "main",
                                        "primary",
                                    ]),
                                }}
                            >
                                Heading 1
                            </h1>
                            <h2
                                className="text-3xl font-bold"
                                style={{
                                    fontFamily: getFontFamily("primary"),
                                    color: getColor([
                                        "colors",
                                        "main",
                                        "primary",
                                    ]),
                                }}
                            >
                                Heading 2
                            </h2>
                            <h3
                                className="text-2xl font-bold"
                                style={{
                                    fontFamily: getFontFamily("primary"),
                                    color: getColor([
                                        "colors",
                                        "main",
                                        "primary",
                                    ]),
                                }}
                            >
                                Heading 3
                            </h3>
                            <p
                                className="text-base"
                                style={{
                                    fontFamily: getFontFamily("secondary"),
                                    color: getColor([
                                        "colors",
                                        "complementary",
                                        "baseContent",
                                    ]),
                                }}
                            >
                                Body text using the secondary font. Lorem ipsum
                                dolor sit amet, consectetur adipiscing elit. Sed
                                do eiusmod tempor incididunt ut labore et dolore
                                magna aliqua.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Buttons */}
                <div className="space-y-4">
                    <h3 className="font-medium">Buttons</h3>
                    <Card
                        style={{
                            backgroundColor: getColor([
                                "colors",
                                "complementary",
                                "base200",
                            ]) || "#f8f9fa",
                        }}
                        className="p-0 py-3"
                    >
                        <CardContent className="space-y-4">
                            <div className="flex flex-wrap gap-4">
                                <Button
                                    style={{
                                        backgroundColor: getColor([
                                            "colors",
                                            "main",
                                            "primary",
                                        ]),
                                        color: getColor([
                                            "colors",
                                            "complementary",
                                            "primaryContent",
                                        ]),
                                        borderRadius: theme.button?.radius ||
                                            "0.5rem",
                                        padding: "0.5rem 1rem",
                                        transition: `all ${
                                            theme.button?.clickDuration ||
                                            "100ms"
                                        }`,
                                        border: "none",
                                    }}
                                >
                                    Primary Button
                                </Button>
                                <Button
                                    style={{
                                        backgroundColor: getColor([
                                            "colors",
                                            "main",
                                            "secondary",
                                        ]),
                                        color: getColor([
                                            "colors",
                                            "complementary",
                                            "secondaryContent",
                                        ]),
                                        borderRadius: theme.button?.radius ||
                                            "0.5rem",
                                        padding: "0.5rem 1rem",
                                        transition: `all ${
                                            theme.button?.clickDuration ||
                                            "100ms"
                                        }`,
                                        border: "none",
                                    }}
                                >
                                    Secondary Button
                                </Button>
                                <Button
                                    style={{
                                        backgroundColor: "transparent",
                                        color: getColor([
                                            "colors",
                                            "main",
                                            "primary",
                                        ]),
                                        borderRadius: theme.button?.radius ||
                                            "0.5rem",
                                        padding: "0.5rem 1rem",
                                        transition: `all ${
                                            theme.button?.clickDuration ||
                                            "100ms"
                                        }`,
                                        border: `1px solid ${
                                            getColor([
                                                "colors",
                                                "main",
                                                "primary",
                                            ])
                                        }`,
                                    }}
                                >
                                    Outlined Button
                                </Button>
                                <Button
                                    style={{
                                        backgroundColor: "transparent",
                                        color: getColor([
                                            "colors",
                                            "main",
                                            "primary",
                                        ]),
                                        borderRadius: theme.button?.radius ||
                                            "0.5rem",
                                        padding: "0.5rem 1rem",
                                        transition: `all ${
                                            theme.button?.clickDuration ||
                                            "100ms"
                                        }`,
                                        border: "none",
                                    }}
                                >
                                    Ghost Button
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <Button
                                    style={{
                                        backgroundColor: getColor([
                                            "colors",
                                            "main",
                                            "success",
                                        ]),
                                        color: getColor([
                                            "colors",
                                            "complementary",
                                            "successContent",
                                        ]),
                                        borderRadius: theme.button?.radius ||
                                            "0.5rem",
                                        padding: "0.5rem 1rem",
                                        transition: `all ${
                                            theme.button?.clickDuration ||
                                            "100ms"
                                        }`,
                                        border: "none",
                                    }}
                                >
                                    Success
                                </Button>
                                <Button
                                    style={{
                                        backgroundColor: getColor([
                                            "colors",
                                            "main",
                                            "error",
                                        ]),
                                        color: getColor([
                                            "colors",
                                            "complementary",
                                            "errorContent",
                                        ]),
                                        borderRadius: theme.button?.radius ||
                                            "0.5rem",
                                        padding: "0.5rem 1rem",
                                        transition: `all ${
                                            theme.button?.clickDuration ||
                                            "100ms"
                                        }`,
                                        border: "none",
                                    }}
                                >
                                    Error
                                </Button>
                                <Button
                                    style={{
                                        backgroundColor: getColor([
                                            "colors",
                                            "main",
                                            "warning",
                                        ]),
                                        color: getColor([
                                            "colors",
                                            "complementary",
                                            "warningContent",
                                        ]),
                                        borderRadius: theme.button?.radius ||
                                            "0.5rem",
                                        padding: "0.5rem 1rem",
                                        transition: `all ${
                                            theme.button?.clickDuration ||
                                            "100ms"
                                        }`,
                                        border: "none",
                                    }}
                                >
                                    Warning
                                </Button>
                                <Button
                                    style={{
                                        backgroundColor: getColor([
                                            "colors",
                                            "main",
                                            "info",
                                        ]),
                                        color: getColor([
                                            "colors",
                                            "complementary",
                                            "infoContent",
                                        ]),
                                        borderRadius: theme.button?.radius ||
                                            "0.5rem",
                                        padding: "0.5rem 1rem",
                                        transition: `all ${
                                            theme.button?.clickDuration ||
                                            "100ms"
                                        }`,
                                        border: "none",
                                    }}
                                >
                                    Info
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Cards */}
                <div className="space-y-4">
                    <h3 className="font-medium">Cards</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <Card
                            style={{
                                backgroundColor: getColor([
                                    "colors",
                                    "main",
                                    "base",
                                ]),
                                boxShadow: theme.shadows?.md,
                            }}
                            className="p-0 py-3"
                        >
                            <CardHeader className="pb-0">
                                <CardTitle
                                    style={{
                                        color: getColor([
                                            "colors",
                                            "main",
                                            "primary",
                                        ]),
                                    }}
                                >
                                    Card Title
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription
                                    style={{
                                        color: getColor([
                                            "colors",
                                            "complementary",
                                            "baseContent",
                                        ]),
                                    }}
                                >
                                    A simple card with some content and a light
                                    background.
                                </CardDescription>
                            </CardContent>
                        </Card>
                        <Card
                            style={{
                                backgroundColor: getColor([
                                    "colors",
                                    "complementary",
                                    "base300",
                                ]),
                                boxShadow: theme.shadows?.md,
                            }}
                            className="p-0 py-3"
                        >
                            <CardHeader className="pb-0">
                                <CardTitle
                                    style={{
                                        color: getColor([
                                            "colors",
                                            "main",
                                            "primary",
                                        ]),
                                    }}
                                >
                                    Alternate Card
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription
                                    style={{
                                        color: getColor([
                                            "colors",
                                            "complementary",
                                            "baseContent",
                                        ]),
                                    }}
                                >
                                    A card with a different background color.
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Form Elements */}
                <div className="space-y-4">
                    <h3 className="font-medium">Form Elements</h3>
                    <Card
                        style={{
                            backgroundColor: getColor([
                                "colors",
                                "complementary",
                                "base200",
                            ]) || "#f8f9fa",
                        }}
                        className="p-0 py-3"
                    >
                        <CardContent>
                            <div className="space-y-2">
                                <Label
                                    htmlFor="preview-text-input"
                                    className="text-sm font-medium block"
                                    style={{
                                        color: getColor([
                                            "colors",
                                            "complementary",
                                            "baseContent",
                                        ]),
                                    }}
                                >
                                    Text Input
                                </Label>
                                <input
                                    id="preview-text-input"
                                    type="text"
                                    placeholder="Type something..."
                                    style={{
                                        width: "100%",
                                        padding: "0.5rem 1rem",
                                        borderRadius: theme.button?.radius ||
                                            "0.5rem",
                                        border: `1px solid ${
                                            getColor([
                                                "colors",
                                                "complementary",
                                                "border",
                                            ])
                                        }`,
                                        backgroundColor: getColor([
                                            "colors",
                                            "main",
                                            "base",
                                        ]),
                                        color: getColor([
                                            "colors",
                                            "complementary",
                                            "baseContent",
                                        ]),
                                    }}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Alerts */}
                <div className="space-y-4">
                    <h3 className="font-medium">Alerts</h3>
                    <div className="space-y-4">
                        <Card
                            style={{
                                backgroundColor: `${
                                    getColor(["colors", "main", "success"])
                                }10`,
                                border: `1px solid ${
                                    getColor(["colors", "main", "success"])
                                }`,
                                color: getColor(["colors", "main", "success"]),
                                borderRadius: theme.button?.radius || "0.5rem",
                            }}
                            className="p-4 py-5"
                        >
                            Success alert message
                        </Card>
                        <Card
                            style={{
                                backgroundColor: `${
                                    getColor(["colors", "main", "error"])
                                }10`,
                                border: `1px solid ${
                                    getColor(["colors", "main", "error"])
                                }`,
                                color: getColor(["colors", "main", "error"]),
                                borderRadius: theme.button?.radius || "0.5rem",
                            }}
                            className="p-4 py-5"
                        >
                            Error alert message
                        </Card>
                        <Card
                            style={{
                                backgroundColor: `${
                                    getColor(["colors", "main", "warning"])
                                }10`,
                                border: `1px solid ${
                                    getColor(["colors", "main", "warning"])
                                }`,
                                color: getColor(["colors", "main", "warning"]),
                                borderRadius: theme.button?.radius || "0.5rem",
                            }}
                            className="p-4 py-5"
                        >
                            Warning alert message
                        </Card>
                        <Card
                            style={{
                                backgroundColor: `${
                                    getColor(["colors", "main", "info"])
                                }10`,
                                border: `1px solid ${
                                    getColor(["colors", "main", "info"])
                                }`,
                                color: getColor(["colors", "main", "info"]),
                                borderRadius: theme.button?.radius || "0.5rem",
                            }}
                            className="p-4 py-5"
                        >
                            Info alert message
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};
