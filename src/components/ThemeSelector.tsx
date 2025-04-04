import React from "react";
import { Theme } from "../types/Theme";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardTitle } from "./ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MoreVertical } from "lucide-react";

interface ThemeSelectorProps {
    themes: Theme[];
    selectedThemeId: string | null;
    onThemeSelect: (themeId: string) => void;
    onSetDefaultTheme?: (themeId: string) => void;
    onRemoveTheme?: (themeId: string) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
    themes,
    selectedThemeId,
    onThemeSelect,
    onSetDefaultTheme,
    onRemoveTheme,
}) => {
    return (
        <div className="w-full bg-white overflow-y-auto">
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {themes.map((theme) => {
                        // Get the filename from the filepath to show as a cleaner ID
                        const filename =
                            theme.id.split("/").pop()?.replace(".json", "") ||
                            theme.id;

                        return (
                            <div
                                key={theme.id}
                                className="relative"
                            >
                                <Card
                                    onClick={() => onThemeSelect(theme.id)}
                                    className={`w-full cursor-pointer border-2 transition-colors ${
                                        theme.id === selectedThemeId
                                            ? "border-emerald-500 bg-emerald-50"
                                            : "border-transparent hover:border-emerald-200"
                                    }`}
                                >
                                    <CardContent className="p-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-1">
                                                <div className="flex items-center">
                                                    <CardTitle className="text-base font-medium">
                                                        {theme.name}
                                                    </CardTitle>
                                                    {theme.isDefault && (
                                                        <span className="ml-2 text-xs text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                                                            Default
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">
                                                    {filename}
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <div className="flex space-x-2">
                                                    <div
                                                        className="w-6 h-6 rounded-full border border-secondary-100"
                                                        style={{
                                                            backgroundColor:
                                                                theme.colors
                                                                    ?.main
                                                                    ?.primary ||
                                                                "#000000",
                                                        }}
                                                    />
                                                    <div
                                                        className="w-6 h-6 rounded-full border border-secondary-100"
                                                        style={{
                                                            backgroundColor:
                                                                theme.colors
                                                                    ?.main
                                                                    ?.secondary ||
                                                                "#000000",
                                                        }}
                                                    />
                                                    <div
                                                        className="w-6 h-6 rounded-full border border-secondary-100"
                                                        style={{
                                                            backgroundColor:
                                                                theme.colors
                                                                    ?.main
                                                                    ?.tertiary ||
                                                                "#000000",
                                                        }}
                                                    />
                                                </div>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        asChild
                                                    >
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="p-1 hover:bg-emerald-100 rounded-full h-auto w-auto"
                                                            onClick={(e) =>
                                                                e.stopPropagation()}
                                                        >
                                                            <MoreVertical className="w-4 h-4 text-text-secondary" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                onSetDefaultTheme?.(
                                                                    theme.id,
                                                                );
                                                            }}
                                                            disabled={theme
                                                                .isDefault}
                                                            className="text-text-primary"
                                                        >
                                                            {theme.isDefault
                                                                ? "Default Theme"
                                                                : "Set as Default"}
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                onRemoveTheme?.(
                                                                    theme.id,
                                                                );
                                                            }}
                                                            disabled={theme
                                                                .isDefault}
                                                            className="text-red-600"
                                                            variant="destructive"
                                                        >
                                                            Remove Theme
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </div>
                                        <div className="mt-4 h-2 rounded-full bg-background-secondary overflow-hidden">
                                            <div
                                                className="h-full rounded-full"
                                                style={{
                                                    background:
                                                        `linear-gradient(to right, ${
                                                            theme.colors?.main
                                                                ?.primary ||
                                                            "#000000"
                                                        }, ${
                                                            theme.colors?.main
                                                                ?.secondary ||
                                                            "#000000"
                                                        }, ${
                                                            theme.colors?.main
                                                                ?.tertiary ||
                                                            "#000000"
                                                        })`,
                                                }}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
