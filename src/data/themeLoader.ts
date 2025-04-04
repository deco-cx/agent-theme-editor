import { Theme } from "../types/Theme";
// @ts-expect-error - Webdraw SDK js is not typed
import { sdk } from "../sdk.js";

interface ThemeManifest {
  default: {
    name: string;
    filePath: string;
  };
  list: Array<{
    name: string;
    filePath: string;
  }>;
}

export const MANIFEST_PATH = "~/DesignSystems/manifest.json";

/**
 * Carrega a lista de temas a partir do manifest.json
 */
export async function loadTheme(): Promise<Theme[]> {
  try {
    // Read the manifest file from the SDK
    const manifestContent = await sdk.fs.read(
      MANIFEST_PATH,
      { encoding: "utf-8" }
    );
    // Parse the manifest content
    const manifest: ThemeManifest = JSON.parse(manifestContent);
    const themes: Theme[] = [];
    // Load all themes from the list
    for (const themeInfo of manifest.list) {
      try {
        // Read the theme file from the SDK
        const themeContent = await sdk.fs.read(
          themeInfo.filePath,
          { encoding: "utf-8" }
        );
        // Parse the theme content
        const data = JSON.parse(themeContent);
        // Extract design system from the loaded theme
        const theme = data.designSystem;
        
        // Set the theme name from the manifest
        theme.name = themeInfo.name;
        
        // Use the filePath as the ID instead of the name
        theme.id = themeInfo.filePath;
        
        // Add siteName if available
        if (data.metadata?.siteName) {
          theme.siteName = data.metadata.siteName;
        } else {
          theme.siteName = themeInfo.name;
        }
        
        // Store the filePath in the theme object for later use when saving
        theme._filePath = themeInfo.filePath;
        
        // Mark theme as default if it matches the default theme in manifest
        theme.isDefault = themeInfo.filePath === manifest.default.filePath;
        
        // Add the theme to the list
        themes.push(theme);
      } catch (themeError) {
        console.error(`Error loading theme ${themeInfo.name}:`, themeError);
      }
    }
    
    return themes;
    
  } catch (error) {
    console.error("Error loading themes from manifest:", error);
    // Return an empty array if there was an error loading the manifest
    return [];
  }
}

/**
 * Sets a theme as the default in the manifest file
 */
export async function setDefaultTheme(themeId: string): Promise<boolean> {
  try {
    // Read the manifest file
    const manifestContent = await sdk.fs.read(
      MANIFEST_PATH,
      { encoding: "utf-8" }
    );
    
    // Parse the manifest content
    const manifest: ThemeManifest = JSON.parse(manifestContent);
    
    // Find the theme in the list by filePath (which is now the ID)
    const themeInfo = manifest.list.find(item => item.filePath === themeId);
    
    if (!themeInfo) {
      console.error(`Theme with ID ${themeId} not found in manifest`);
      return false;
    }
    
    // Update the default theme in the manifest
    manifest.default = {
      name: themeInfo.name,
      filePath: themeInfo.filePath
    };
    
    // Convert back to JSON string with nice formatting
    const updatedContent = JSON.stringify(manifest, null, 2);
    
    // Write the updated manifest back to the file
    await sdk.fs.write(
      MANIFEST_PATH,
      updatedContent,
      { encoding: "utf-8" }
    );
    
    return true;
  } catch (error) {
    console.error("Error setting default theme in manifest:", error);
    return false;
  }
}

/**
 * Salva o tema atualizado de volta no sistema de arquivos
 */
export async function saveTheme(theme: Theme): Promise<boolean> {
  try {
    // Get the file path from the theme object
    const filePath = theme._filePath;
    
    if (!filePath) {
      console.error("No file path found for theme", theme.id);
      return false;
    }
    
    // Read the current file to get the original structure
    const fileContent = await sdk.fs.read(
      filePath,
      { encoding: "utf-8" }
    );
    
    // Parse the file content
    const data = JSON.parse(fileContent);
    
    // Update the design system section with the new theme
    data.designSystem = theme;
    
    // Remove internal properties before saving
    delete data.designSystem._filePath;
    delete data.designSystem.isDefault;
    
    // Convert back to JSON string with nice formatting
    const updatedContent = JSON.stringify(data, null, 2);
    
    // Write the updated content back to the file
    await sdk.fs.write(
      filePath,
      updatedContent,
      { encoding: "utf-8" }
    );

    return true;
  } catch (error) {
    console.error("Error saving theme:", error);
    return false;
  }
} 