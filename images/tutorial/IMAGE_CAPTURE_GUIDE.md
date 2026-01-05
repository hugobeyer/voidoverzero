# Tutorial Image Capture Guide

This document lists all the screenshots/images needed for the tutorial page. Each image should be saved as a PNG file in the `images/tutorial/` folder with the filename specified.

## Getting Started Section

### 01-package-manager.png
**Location:** Unity Editor → Window → Package Manager
**What to capture:** 
- Package Manager window open
- The "+" button visible
- "Add package from disk" option highlighted or visible in dropdown
- Show the context where users would import the Rawteous package

### 02-add-component.png
**Location:** Unity Inspector (with a GameObject selected)
**What to capture:**
- Inspector panel showing a GameObject
- "Add Component" button visible
- Search dropdown open with "Rawteous Impostors" visible in the search results
- Highlight or arrow pointing to the component name

### 03-component-added.png
**Location:** Unity Inspector
**What to capture:**
- Inspector showing the Rawteous Impostors component added to a GameObject
- Default settings visible (all default values shown)
- Component fully expanded showing all default parameter groups

### 04-configure-settings.png
**Location:** Unity Inspector
**What to capture:**
- Rawteous component in Inspector
- Texture Resolution set to 256 or 512 (slider visible)
- Azimuth Steps set to 8
- Elevation Steps set to 4
- Settings clearly visible and readable

### 05-regenerate-button.png
**Location:** Unity Inspector
**What to capture:**
- Rawteous component showing the "Regenerate" button
- Button should be clearly visible
- Optional: Add a highlight or arrow pointing to the button

### 06-capture-process.png
**Location:** Unity Scene View
**What to capture:**
- Scene view showing the object being captured
- If gizmos are visible, show the capture cameras/positions
- Object in the process of being captured (or just before/after)
- Can show the capture gizmos if the "Show Gizmos" option is enabled

### 07-impostor-result.png
**Location:** Unity Game View or Scene View
**What to capture:**
- The final impostor result from different angles
- Side-by-side comparison showing the object from multiple viewpoints
- OR an animated GIF showing rotation around the impostor
- Should clearly show the impostor working correctly

## Performance Optimization Section

### 08-resolution-comparison.png
**Location:** Unity Game View or Scene View
**What to capture:**
- Side-by-side comparison of the same object at different resolutions
- Show three versions: Low (64-128), Medium (256-512), High (1024+)
- Label each clearly or show them in a grid
- Should demonstrate the quality difference

### 09-capture-steps.png
**Location:** Unity Inspector
**What to capture:**
- Rawteous component showing Azimuth Steps and Elevation Steps sliders
- Values clearly visible (e.g., Azimuth: 8, Elevation: 4)
- Settings section expanded and readable

### 10-step-comparison.png
**Location:** Unity Game View
**What to capture:**
- Visual comparison showing smooth transitions vs. popping
- Side-by-side: Low steps (showing popping) vs. High steps (smooth)
- OR an animated GIF showing rotation with different step counts
- Should demonstrate the difference in transition smoothness

### 11-impostor-mode.png
**Location:** Unity Inspector
**What to capture:**
- Rawteous component showing the Impostor Mode dropdown
- "Texture Based" option selected (or dropdown open showing both options)
- Setting clearly visible

### 12-mode-comparison.png
**Location:** Unity Game View
**What to capture:**
- Visual comparison between Texture-Based and Smooth Blending modes
- Side-by-side showing the difference in transition smoothness
- OR an animated GIF showing rotation with both modes
- Should show how Smooth Blending is smoother but Texture-Based is faster

### 13-batch-selection.png
**Location:** Unity Hierarchy and Inspector
**What to capture:**
- Hierarchy showing multiple GameObjects selected
- Inspector showing that Rawteous component can be added to all selected objects
- OR showing multiple objects with the component already added
- Demonstrate batch operations

## Advanced Techniques Section

### 14-capture-settings.png
**Location:** Unity Inspector
**What to capture:**
- Rawteous component with Capture settings section expanded
- Capture Distance slider visible
- Field of View setting visible
- Background Color option visible
- All capture-related settings clearly shown

### 15-runtime-generation.png
**Location:** Unity Inspector (with script) or Game View
**What to capture:**
- A script component showing runtime generation code
- OR Game View showing objects being converted to impostors at runtime
- OR Inspector showing a script that adds Rawteous components programmatically
- Should demonstrate runtime/dynamic generation

### 16-lod-comparison.png
**Location:** Unity Game View or Scene View
**What to capture:**
- Visual comparison showing close-up (original mesh) vs. far away (impostor)
- Side-by-side or showing the same object at different distances
- OR showing the transition from mesh to impostor based on distance
- Should demonstrate LOD concept

### 17-mobile-settings.png
**Location:** Unity Inspector
**What to capture:**
- Rawteous component with mobile-optimized settings
- Low resolution (128-256) visible
- Fewer steps (4-6 azimuth, 2 elevation) visible
- Texture-Based mode selected
- Settings clearly labeled or annotated

## Troubleshooting Section

### 18-blurry-fix.png
**Location:** Unity Game View or Inspector
**What to capture:**
- Side-by-side showing blurry impostor vs. sharp impostor
- OR showing the resolution slider being adjusted from low to high
- Should demonstrate the fix for blurry impostors

### 19-popping-fix.png
**Location:** Unity Game View or Inspector
**What to capture:**
- Visual showing the popping issue, then the fix
- OR showing step count being increased
- OR showing Smooth Blending mode being enabled
- Should demonstrate how to fix visible popping between angles

## Image Specifications

- **Format:** PNG
- **Recommended Resolution:** 1920x1080 or higher (for clarity)
- **Aspect Ratio:** 16:9 or match Unity's default aspect ratio
- **File Naming:** Use exact filenames listed above (e.g., `01-package-manager.png`)
- **Styling:** 
  - Use Unity's default dark theme for consistency
  - Ensure text is readable
  - Add highlights/arrows where helpful
  - Keep UI elements clearly visible

## Notes

- All images should be captured in Unity Editor
- Use consistent Unity theme (dark theme recommended)
- Ensure all UI text is readable
- Consider adding annotations or highlights to guide users
- For comparisons, use side-by-side layouts or clear before/after shots
