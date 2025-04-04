import { useEffect, useState } from "react";
import { ThemeSelector } from "./components/ThemeSelector";
import { ThemeEditor } from "./components/ThemeEditor";
import { ThemePreview } from "./components/ThemePreview";
import { GoogleFontsLoader } from "./components/GoogleFontsLoader";
import { Theme } from "./types/Theme";
import {
  loadTheme,
  MANIFEST_PATH,
  saveTheme,
  setDefaultTheme,
} from "./data/themeLoader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./components/ui/accordion";

function App() {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null);
  const [defaultThemeId, setDefaultThemeId] = useState<string>("");
  const [activeAccordion, setActiveAccordion] = useState<string>("selector");
  const [isSaving, setIsSaving] = useState(false);

  const selectedTheme = themes.find((theme) => theme.id === selectedThemeId);

  useEffect(() => {
    const loadThemeData = async () => {
      const loadedThemes = await loadTheme();
      setThemes(loadedThemes);

      if (loadedThemes.length > 0) {
        // Find the default theme
        const defaultTheme = loadedThemes.find((theme) => theme.isDefault) ||
          loadedThemes[0];
        setDefaultThemeId(defaultTheme.id);
      } else {
        // No themes were loaded
        setDefaultThemeId("");
        setSelectedThemeId(null);
      }
    };

    loadThemeData();
  }, []);

  const handleThemeSelect = (themeId: string) => {
    setSelectedThemeId(themeId);
    setActiveAccordion("editor");
  };

  const handleThemeChange = async (updatedTheme: Theme) => {
    try {
      setIsSaving(true);

      // Save the theme to the server
      const saveResult = await saveTheme(updatedTheme);

      if (saveResult) {
        // Update the local state with the updated theme
        setThemes(
          themes.map((theme) =>
            theme.id === updatedTheme.id ? updatedTheme : theme
          ),
        );
      } else {
        console.error("Failed to save theme");
      }
    } catch (error) {
      console.error("Error saving theme:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSetDefaultTheme = async (themeId: string) => {
    try {
      // Set the theme as default in the manifest file
      const result = await setDefaultTheme(themeId);

      if (result) {
        // Update local state to reflect the new default theme
        setDefaultThemeId(themeId);

        // Update the isDefault property on all themes
        setThemes(
          themes.map((theme) => ({
            ...theme,
            isDefault: theme.id === themeId,
          })),
        );
      } else {
        console.error(`Failed to set theme ${themeId} as default`);
      }
    } catch (error) {
      console.error("Error setting default theme:", error);
    }
  };

  const handleRemoveTheme = (themeId: string) => {
    // Don't remove if it's the default theme
    if (themeId === defaultThemeId) return;

    // Remove the theme
    const newThemes = themes.filter((theme) => theme.id !== themeId);
    setThemes(newThemes);

    // If the removed theme was selected, select another theme
    if (selectedThemeId === themeId) {
      setSelectedThemeId(null);
      setActiveAccordion("selector");
    }
  };

  const handleGoToPreview = () => {
    setActiveAccordion("preview");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {selectedTheme && <GoogleFontsLoader theme={selectedTheme} />}

      <div className="flex-1 flex flex-col justify-start">
        <Accordion
          type="single"
          collapsible
          value={activeAccordion}
          onValueChange={setActiveAccordion}
          className="w-full"
        >
          <AccordionItem
            value="selector"
            className="border-b border-emerald-100"
          >
            <AccordionTrigger className="px-6 py-4 hover:no-underline cursor-pointer bg-white font-semibold text-emerald-900 text-xl">
              Theme Selector
            </AccordionTrigger>
            <AccordionContent className="pt-0 overflow-auto max-h-[calc(100vh-12rem)]">
              {themes.length > 0
                ? (
                  <ThemeSelector
                    themes={themes}
                    selectedThemeId={selectedThemeId}
                    onThemeSelect={handleThemeSelect}
                    onSetDefaultTheme={handleSetDefaultTheme}
                    onRemoveTheme={handleRemoveTheme}
                  />
                )
                : (
                  <div className="p-6 text-center">
                    <p className="text-lg text-gray-600 mb-4">
                      No themes found in the manifest file.
                    </p>
                    <p className="text-gray-500">
                      The manifest file should be located at:
                    </p>
                    <code className="block mt-2 p-2 bg-gray-100 rounded text-sm">
                      {MANIFEST_PATH}
                    </code>
                  </div>
                )}
            </AccordionContent>
          </AccordionItem>

          {selectedTheme && (
            <AccordionItem
              value="editor"
              className="border-b border-emerald-100"
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline cursor-pointer bg-white font-semibold text-emerald-900 text-xl">
                Theme Editor
              </AccordionTrigger>
              <AccordionContent className="pt-0 overflow-auto max-h-[calc(100vh-12rem)]">
                <ThemeEditor
                  theme={selectedTheme}
                  onThemeChange={handleThemeChange}
                  onSaveComplete={handleGoToPreview}
                  isSaving={isSaving}
                />
              </AccordionContent>
            </AccordionItem>
          )}

          {selectedTheme && (
            <AccordionItem
              value="preview"
              className="border-b border-emerald-100"
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline cursor-pointer bg-white font-semibold text-emerald-900 text-xl">
                Theme Preview
              </AccordionTrigger>
              <AccordionContent className="pt-0 overflow-auto max-h-[calc(100vh-12rem)]">
                <ThemePreview theme={selectedTheme} />
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </div>
    </div>
  );
}

export default App;
