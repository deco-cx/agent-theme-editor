# Theme Editor

A specialized view for AI agents to access and utilize brand design systems and style guides. This tool enables AI to maintain perfect brand consistency by providing a structured JSON format for documenting brand identity elements, design systems, photography guidelines, and content strategies.

## Primary Purpose

The Theme Editor serves as a dedicated interface between your brand guidelines and AI agents, allowing:

- AI assistants to understand and maintain your brand voice across all content generation
- Design automation tools to access precise design system specifications
- Chatbots and other AI interfaces to respond with on-brand messaging
- Content generation systems to align with your brand's positioning and values

## Features

- **AI-Optimized Structure**: JSON format specifically designed for AI agent consumption
- **Complete Brand Documentation**: Document every aspect of your brand from history to design components
- **Design System Reference**: Define colors, typography, spacing, and components in a structured format
- **Brand Identity Guidelines**: Capture your brand's voice, personality, and visual identity
- **Export Options**: Save and share your brand guidelines as JSON files

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

## Structure

The JSON structure provides AI agents with comprehensive brand guidelines through these main sections:

- **Metadata**: Basic information about the brand and site
- **Brand Identity**: Company history, positioning, voice, and logo guidelines
- **Design System**: Colors, typography, spacing, and component styles
- **Photography**: Style guidelines and technical requirements
- **Iconography**: Style, grid specifications, and usage categories
- **Usage Guidelines**: Digital and print usage rules
- **Content Strategy**: Messaging principles and SEO guidelines

## Usage

1. Start with the `empty.json` template to build your brand guide for AI consumption
2. Fill in each section with your brand's specific details
3. Provide this JSON to your AI agents to ensure brand-consistent outputs
4. Update as your brand evolves to maintain consistency across all AI interactions

## How AI Agents Use This Data

- **Content Generation**: AI references your brand voice and style guidelines when creating text
- **Design Automation**: AI tools pull exact color codes, typography and spacing for visual assets
- **Conversational UI**: Chatbots adopt your brand's tone and personality in user interactions
- **Marketing Materials**: AI-generated content maintains consistent messaging hierarchies and priorities
- **Multi-channel Consistency**: Ensure brand consistency across all AI touchpoints

## Example

Check `example.json` in the public directory for a complete example of a brand style guide for Fila Brasil that can be used by AI agents.

## Tech Stack

- React + TypeScript
- Vite for fast development
- JSON for data storage and sharing
