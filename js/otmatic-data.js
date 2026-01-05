/**
 * OtMatic UVs Documentation Data
 * Comprehensive reference for all UV generation parameters
 * Updated: January 2025
 * Version: 1.0.0
 */

const DOCS_DATA = {
    panels: [
        {
            id: 'seams',
            name: 'SEAMS',
            icon: '../Packages/com.voidoverzero.otmaticuvs/UI/icons/seams.png',
            description: 'Configure how UV seams are detected and placed. Seams define where the mesh is cut for unwrapping. Proper seam placement is crucial for minimizing distortion and achieving clean UV layouts.',
            groups: [
                {
                    id: 'detection',
                    name: 'Seam Detection',
                    description: 'Control how edges become UV seams based on surface angles and mesh topology. The algorithm uses Union-Find data structures to group triangles into charts.',
                    params: [
                        {
                            id: 'unwrap-mode',
                            name: 'Unwrap Mode',
                            desc: 'Unwrap style that determines seam detection strategy. Organic: Best for smooth topology like characters or organic shapes. Allows more stretch, creates fewer seams. HardSurface: Best for mechanical/architectural objects. Strict angle cuts, minimal stretch, preserves sharp edges. Mosaic: Best for scanned meshes or highly triangulated geometry. Creates many small islands, minimizes distortion. Each mode automatically configures internal parameters for optimal results.',
                            image: ''
                        },
                        {
                            id: 'angle-threshold',
                            name: 'Angle Threshold',
                            desc: 'Edges with dihedral angle greater than this become seams (15-120°). Higher values = fewer islands but potentially more distortion. Lower values = more islands with better unwrapping. Default: 66°. The algorithm measures the angle between face normals across each edge. Sharp edges (high angles) naturally become seams. Adjust based on your mesh complexity and desired island count.',
                            image: ''
                        },
                        {
                            id: 'preserve-hard-edges',
                            name: 'Preserve Hard Edges',
                            desc: 'Use mesh hard edges as UV seams. When enabled, edges marked as hard/smooth groups in the mesh will always become seams, regardless of angle threshold. Essential for preserving sharp features like creases, corners, and mechanical edges. Disable only if you want angle-based detection to override mesh topology.',
                            image: ''
                        }
                    ]
                },
                {
                    id: 'chart-growing',
                    name: 'Chart Growing',
                    description: 'Advanced seam detection using Union-Find chart growing algorithm. Triangles are merged into charts based on angle similarity, then charts become islands.',
                    params: [
                        {
                            id: 'continue-seam-paths',
                            name: 'Continue Seam Paths',
                            desc: 'Extend seams along edge chains for cleaner cuts. When enabled, seams follow natural edge flows rather than stopping abruptly. Creates more continuous seam lines that follow mesh topology. Disable for more fragmented but potentially more accurate seam placement.',
                            image: ''
                        },
                        {
                            id: 'seam-angle-limit',
                            name: 'Seam Angle Limit',
                            desc: 'Maximum angle change in seam path (degrees). Prevents seams from making harsh turns. Lower values create straighter seams. Higher values allow seams to follow curved surfaces more closely. Default: 60°. Adjust if seams appear jagged or too curved.',
                            image: ''
                        },
                        {
                            id: 'force-single-island',
                            name: 'Force Single Island',
                            desc: 'Force all faces into one island, ignoring angle thresholds. Creates a single continuous UV island. Useful for simple objects or when you want maximum UV space utilization. Warning: May cause significant distortion on complex geometry. Only use for simple, developable surfaces.',
                            image: ''
                        }
                    ]
                }
            ]
        },
        {
            id: 'unfold',
            name: 'UNFOLD',
            icon: '../Packages/com.voidoverzero.otmaticuvs/UI/icons/unfold.png',
            description: 'Control the unwrapping algorithm that flattens 3D geometry into 2D UV space with minimal distortion. Uses ABF++ (Angle-Based Flattening) relaxation for optimal results.',
            groups: [
                {
                    id: 'relaxation',
                    name: 'Relaxation',
                    description: 'ABF++ relaxation iterations minimize UV distortion by preserving angles and areas. Higher iterations improve quality but increase computation time. The algorithm iteratively adjusts UV coordinates to match 3D geometry.',
                    params: [
                        {
                            id: 'unfold-iterations',
                            name: 'Unfold Iterations',
                            desc: 'Number of LSCM (Least Squares Conformal Mapping) relaxation iterations (5-1000). Higher = better unfold quality but slower generation. Default: 30. Each iteration improves UV layout by reducing distortion. For simple meshes, 10-20 iterations suffice. Complex meshes may need 50-100+ for optimal results. Very high values (500+) provide diminishing returns.',
                            image: ''
                        },
                        {
                            id: 'min-island-triangles',
                            name: 'Min Island Triangles',
                            desc: 'Minimum triangles per island (1-1000). Islands with fewer triangles get merged into neighbors. Default: 32. Prevents tiny islands that waste UV space and create texture sampling issues. Lower values preserve more detail but may create many small islands. Higher values merge small islands but may lose important features.',
                            image: ''
                        },
                        {
                            id: 'post-relax-iterations',
                            name: 'Post Relax Iterations',
                            desc: 'Post-relaxation smoothing iterations (0-20). Additional smoothing pass after main relaxation. Higher = smoother UVs with less distortion. Default: 10. This pass smooths out any remaining artifacts from the main relaxation. Use 0 to disable smoothing, or increase for very smooth results on organic meshes.',
                            image: ''
                        }
                    ]
                },
                {
                    id: 'projection',
                    name: 'Initial Projection',
                    description: 'How islands are initially projected into UV space before relaxation. The starting projection affects final quality.',
                    params: [
                        {
                            id: 'best-face-projection',
                            name: 'Best Face Projection',
                            desc: 'Each island is projected from its most representative face. The algorithm finds the face with the most similar normal to the island average, then projects all faces relative to that. This provides the best starting point for relaxation. Always enabled - this is the core projection method.',
                            image: ''
                        },
                        {
                            id: 'stretch-factor',
                            name: 'Stretch Factor',
                            desc: 'Balance between conformal (angle-preserving) and area-preserving mapping (0-1). 0 = pure conformal (preserves angles), 1 = pure area-preserving (preserves areas). Default varies by mode. Organic mode uses higher stretch (0.3) for smoother results. HardSurface uses lower stretch (0.1) for minimal distortion. Adjust if you see angle distortion vs area distortion.',
                            image: ''
                        }
                    ]
                },
                {
                    id: 'advanced',
                    name: 'Advanced Unfolding',
                    description: 'Advanced parameters for fine-tuning unwrapping behavior. These are automatically configured based on Unwrap Mode but can be adjusted for specific needs.',
                    params: [
                        {
                            id: 'hard-angle',
                            name: 'Hard Angle',
                            desc: 'Maximum chart bending before split (degrees). Charts that bend beyond this angle get split into separate islands. Lower values create more islands but reduce distortion. Higher values allow more bending. Organic: 120°, HardSurface: 90°, Mosaic: 60°. Adjust if charts appear too bent or split unnecessarily.',
                            image: ''
                        },
                        {
                            id: 'cut-grooves',
                            name: 'Cut Grooves',
                            desc: 'Cut seams along concave edges (grooves). When enabled, concave edges become seams automatically. Useful for mechanical objects with grooves, slots, or recessed areas. HardSurface and Mosaic modes enable this by default. Disable if you want smoother unwrapping without groove cuts.',
                            image: ''
                        },
                        {
                            id: 'groove-angle',
                            name: 'Groove Angle',
                            desc: 'Angle threshold for detecting grooves (degrees). Edges with concavity greater than this become seams. Lower values detect more subtle grooves. Higher values only detect deep grooves. Default: 60° for HardSurface, 30° for Mosaic. Adjust based on your mesh detail level.',
                            image: ''
                        },
                        {
                            id: 'cut-ridges',
                            name: 'Cut Ridges',
                            desc: 'Cut seams along convex edges (ridges). When enabled, sharp convex edges become seams. Useful for Mosaic mode to handle highly detailed geometry. Creates more islands but reduces distortion on complex surfaces. Only enabled in Mosaic mode by default.',
                            image: ''
                        },
                        {
                            id: 'ridge-angle',
                            name: 'Ridge Angle',
                            desc: 'Angle threshold for detecting ridges (degrees). Convex edges exceeding this angle become seams. Lower values create more seams on ridges. Higher values only cut very sharp ridges. Default: 30° for Mosaic mode. Adjust if ridges cause distortion.',
                            image: ''
                        },
                        {
                            id: 'cut-holes',
                            name: 'Cut Holes',
                            desc: 'Detect and cut around holes in the mesh. When enabled, the algorithm identifies holes (loops of edges) and creates seams around them. Essential for proper unwrapping of meshes with holes, tunnels, or complex topology. Always enabled by default. Disable only if holes should be ignored.',
                            image: ''
                        }
                    ]
                }
            ]
        },
        {
            id: 'packing',
            name: 'PACKING',
            icon: '../Packages/com.voidoverzero.otmaticuvs/UI/icons/packing.png',
            description: 'Configure how UV islands are arranged and scaled within the 0-1 UV space for optimal texture usage. Efficient packing maximizes texture resolution and minimizes wasted space.',
            groups: [
                {
                    id: 'layout',
                    name: 'Layout',
                    description: 'Control island positioning, spacing, and scaling within UV space. Proper layout ensures maximum texture utilization and prevents texture bleeding.',
                    params: [
                        {
                            id: 'padding',
                            name: 'Padding',
                            desc: 'Space between UV islands (0-10). Higher values prevent texture bleeding but waste UV space. Default: 2. Measured as percentage of UV space. For 1024px textures, 2% = ~20 pixels padding. Increase for lower resolution textures or when using mipmaps. Decrease for maximum space utilization on high-res textures. Too low may cause bleeding, too high wastes valuable UV space.',
                            image: ''
                        },
                        {
                            id: 'uv-scale',
                            name: 'UV Scale',
                            desc: 'Global UV scale multiplier (0.001-1000). Scales all islands uniformly. Default: 1.0. Use values < 1.0 to fit islands within 0-1 space. Use values > 1.0 for tiling textures. For example, 2.0 makes islands tile twice. Useful for seamless textures or when you want islands to extend beyond 0-1 range. Adjust after packing to fine-tune size.',
                            image: ''
                        },
                        {
                            id: 'auto-scale-by-area',
                            name: 'Auto Scale by Area',
                            desc: 'Scale UV islands based on 3D surface area for consistent texel density. When enabled, larger 3D surfaces get proportionally larger UV space. Ensures uniform texture resolution across the mesh - a 2x larger surface gets 2x more UV space. Essential for maintaining consistent detail level. Disable only if you want uniform island sizes regardless of 3D size.',
                            image: ''
                        },
                        {
                            id: 'use-tetris-packing',
                            name: 'Tetris Packing',
                            desc: 'Use tetris-based packing instead of grid layout. More efficient UV space usage (often 10-20% better) but may create non-uniform layouts. Grid packing is simpler and more predictable with uniform spacing. Tetris packing rotates and fits islands more tightly like puzzle pieces. Enable for maximum space efficiency, disable for cleaner, more organized layouts. Best for complex meshes with many varied island sizes.',
                            image: ''
                        }
                    ]
                },
                {
                    id: 'optimization',
                    name: 'Packing Optimization',
                    description: 'Advanced packing options for maximizing UV space utilization and texture efficiency.',
                    params: [
                        {
                            id: 'pack-islands-enabled',
                            name: 'Pack Islands Enabled',
                            desc: 'Enable island packing into 0-1 UV space. When disabled, islands remain in their original positions (useful for debugging or manual layout). When enabled, islands are automatically arranged and scaled to fit efficiently. Always enable for production use. Disable only for inspection or manual UV editing workflows.',
                            image: ''
                        },
                        {
                            id: 'rotation-enabled',
                            name: 'Allow Rotation',
                            desc: 'Allow islands to rotate during packing for better fit. When enabled, islands can be rotated 90° increments to fit more efficiently. Significantly improves packing efficiency, especially with Tetris packing. Disable if you need consistent island orientation (e.g., for directional textures or specific workflows).',
                            image: ''
                        },
                        {
                            id: 'max-packing-iterations',
                            name: 'Max Packing Iterations',
                            desc: 'Maximum iterations for packing optimization (internal). Higher values improve packing quality but increase generation time. The algorithm tries different arrangements to find the best fit. Default is automatically set based on island count. Very high values (1000+) provide minimal improvement for most meshes.',
                            image: ''
                        }
                    ]
                }
            ]
        },
        {
            id: 'preview',
            name: 'PREVIEW',
            icon: '../Packages/com.voidoverzero.otmaticuvs/UI/icons/preview.png',
            description: 'Visualization tools for inspecting UV quality, seams, and island distribution. Real-time preview helps identify issues and verify UV layout quality before applying.',
            groups: [
                {
                    id: 'visualization',
                    name: 'Visualization',
                    description: 'Tools for visualizing UV layout quality and identifying distortion, stretching, and layout issues.',
                    params: [
                        {
                            id: 'show-checker',
                            name: 'Show Checker',
                            desc: 'Display checker texture on mesh for UV visualization. Helps identify distortion, stretching, and UV layout quality. Checker pattern should appear uniform and square for good UVs. Distorted or stretched checkers indicate UV problems. Essential tool for quality assessment. The checker texture is applied to a preview object positioned next to the original mesh.',
                            image: ''
                        },
                        {
                            id: 'checker-scale',
                            name: 'Checker Scale',
                            desc: 'Checker texture scale (0.1-100). Higher values = smaller checker pattern, more detail visible. Lower values = larger pattern, better for overall assessment. Default: 1.0. Adjust to see UV details at different scales. Use lower values (0.5-1.0) to check overall layout, higher values (2-5) to inspect fine details and distortion.',
                            image: ''
                        },
                        {
                            id: 'show-seams',
                            name: 'Show Seams',
                            desc: 'Display UV seams in Scene view as bright green lines. Helps visualize where the mesh is cut for unwrapping. Useful for understanding island boundaries and verifying seam placement. Seams are drawn as thick green lines offset slightly from the mesh surface to prevent z-fighting. Enable to see exactly where cuts occur, disable to see clean mesh preview.',
                            image: ''
                        },
                        {
                            id: 'show-island-colors',
                            name: 'Show Island Colors',
                            desc: 'Color-code UV islands for easy identification. Each island gets a unique, vibrant color. Helps visualize island distribution and identify problematic areas. Colors are assigned using golden ratio distribution for maximum visual distinction. Enable to see island boundaries clearly, especially useful for complex meshes with many islands. Colors are also visible in the UV preview window.',
                            image: ''
                        }
                    ]
                },
                {
                    id: 'uv-preview',
                    name: 'UV Preview Window',
                    description: 'Interactive 2D UV preview window showing the UV layout. Pan, zoom, and inspect UV islands directly.',
                    params: [
                        {
                            id: 'uv-preview-enabled',
                            name: 'UV Preview Enabled',
                            desc: 'Display interactive 2D UV preview in the inspector. Shows UV layout with grid, islands, and seams. Pan with left/right mouse drag, zoom with scroll wheel, reset with double-click or F key. Essential for detailed UV inspection. The preview updates in real-time as you adjust parameters.',
                            image: ''
                        },
                        {
                            id: 'uv-grid',
                            name: 'UV Grid',
                            desc: 'Display Maya-style UV grid in preview window. Shows UV coordinate system with axis lines. Red line = U axis (horizontal), Green line = V axis (vertical). Grid tiles represent 0-1 UV space. Helps visualize UV coordinates and island placement. Grid coordinates are labeled when zoomed in sufficiently.',
                            image: ''
                        },
                        {
                            id: 'show-backfaces',
                            name: 'Show Backfaces',
                            desc: 'Display back-facing triangles in UV preview. When enabled, triangles with reversed winding are shown. Useful for identifying flipped faces or winding issues. Backfaces are typically hidden by default for cleaner preview. Enable if you suspect face orientation problems.',
                            image: ''
                        },
                        {
                            id: 'island-stats',
                            name: 'Island Statistics',
                            desc: 'Display island count and seam count in UV preview. Shows total number of UV islands and seam edges. Updated in real-time as parameters change. Useful for tracking optimization - fewer islands generally means better packing, but may increase distortion. Balance island count with distortion for optimal results.',
                            image: ''
                        }
                    ]
                },
                {
                    id: 'scene-view',
                    name: 'Scene View Visualization',
                    description: 'Visualization options for the Unity Scene view. See seams, islands, and preview objects.',
                    params: [
                        {
                            id: 'preview-object-offset',
                            name: 'Preview Object Offset',
                            desc: 'Distance between original mesh and preview object. The preview object shows the mesh with generated UVs and checker texture. Automatically positioned to the right of the original mesh. Offset is calculated based on mesh bounds. Adjust if preview overlaps with original or is too far away.',
                            image: ''
                        },
                        {
                            id: 'seam-line-width',
                            name: 'Seam Line Width',
                            desc: 'Thickness of seam visualization lines in Scene view (pixels). Thicker lines are more visible but may obscure mesh details. Default: 5 pixels. Adjust based on mesh scale and viewing distance. Increase for large meshes viewed from far away, decrease for detailed close-up inspection.',
                            image: ''
                        },
                        {
                            id: 'seam-color',
                            name: 'Seam Color',
                            desc: 'Color of seam visualization lines. Default: Bright green (0, 255, 77) for high visibility. Green stands out against most mesh colors and backgrounds. Seams are drawn slightly offset from mesh surface to prevent z-fighting with geometry.',
                            image: ''
                        }
                    ]
                }
            ]
        },
        {
            id: 'workflow',
            name: 'WORKFLOW',
            icon: '../Packages/com.voidoverzero.otmaticuvs/UI/icons/workflow.png',
            description: 'Workflow tools and settings for efficient UV generation. Batch operations, menu items, and inspector controls.',
            groups: [
                {
                    id: 'generation',
                    name: 'UV Generation',
                    description: 'Control when and how UVs are generated. Real-time preview, throttled updates, and manual generation options.',
                    params: [
                        {
                            id: 'auto-generate',
                            name: 'Auto Generate',
                            desc: 'Automatically generate UVs when component is added or mesh changes. When enabled, UVs are generated immediately when the component is added to a GameObject. Also regenerates when source mesh changes. Disable for manual control - use Generate button to create UVs on demand. Useful for preventing automatic generation during mesh editing workflows.',
                            image: ''
                        },
                        {
                            id: 'throttle-updates',
                            name: 'Throttle Updates',
                            desc: 'Throttle automatic updates to reduce computation during parameter adjustment. When enabled, updates are delayed by 0.05 seconds after parameter changes. Prevents excessive regeneration while dragging sliders. Improves inspector responsiveness. Disable for instant updates (may cause lag with complex meshes).',
                            image: ''
                        },
                        {
                            id: 'generate-button',
                            name: 'Generate Button',
                            desc: 'Manual UV generation button in inspector. Click to generate UVs immediately, bypassing throttling. Useful for testing specific parameter combinations or forcing regeneration. The button shows a refresh icon (⟳) and triggers immediate generation regardless of auto-generate setting.',
                            image: ''
                        },
                        {
                            id: 'apply-button',
                            name: 'Apply Button',
                            desc: 'Apply generated UVs to the mesh. Saves the generated mesh with new UVs. Opens file save dialog to choose location. The mesh is saved as a new asset, preserving the original. After saving, you can assign it to the MeshFilter or use it elsewhere. Essential for committing UV changes to your project.',
                            image: ''
                        }
                    ]
                },
                {
                    id: 'batch-operations',
                    name: 'Batch Operations',
                    description: 'Menu items for batch UV generation across multiple objects. Efficient for processing many meshes at once.',
                    params: [
                        {
                            id: 'add-to-selected',
                            name: 'Add to Selected',
                            desc: 'Menu item: Tools → OtMatic UVs → Add to Selected. Adds OtMatic UVs component to all selected GameObjects with meshes. Validates that objects have MeshFilter or SkinnedMeshRenderer. Skips objects that already have the component. Useful for batch setup of multiple objects. Shows dialog with results.',
                            image: ''
                        },
                        {
                            id: 'generate-for-selected',
                            name: 'Generate for Selected',
                            desc: 'Menu item: Tools → OtMatic UVs → Generate UVs for Selected. Generates UVs for all selected GameObjects with OtMatic UVs components. Processes each object sequentially. Shows progress and results. Useful for batch generation after adjusting settings. Objects without the component are skipped with a warning.',
                            image: ''
                        },
                        {
                            id: 'batch-generate-all',
                            name: 'Batch Generate All in Scene',
                            desc: 'Menu item: Tools → OtMatic UVs → Batch Generate All in Scene. Generates UVs for all OtMatic UVs components in the current scene. Shows confirmation dialog with count. Processes all objects automatically. Useful for regenerating all UVs after global setting changes. May take time for scenes with many objects.',
                            image: ''
                        },
                        {
                            id: 'remove-from-selected',
                            name: 'Remove from Selected',
                            desc: 'Menu item: Tools → OtMatic UVs → Remove from Selected. Removes OtMatic UVs component from all selected GameObjects. Cleans up components that are no longer needed. Preserves generated meshes if they were saved. Useful for cleanup after UV generation is complete.',
                            image: ''
                        }
                    ]
                },
                {
                    id: 'settings',
                    name: 'Settings Window',
                    description: 'Default settings window for configuring default values applied to new OtMatic UVs components.',
                    params: [
                        {
                            id: 'open-settings',
                            name: 'Open Settings',
                            desc: 'Menu item: Tools → OtMatic UVs → Open Settings. Opens the settings window for configuring default values. Settings include default angle threshold, padding, UV scale, and other parameters. Values are saved in EditorPrefs and applied to new components. Useful for establishing project-wide defaults.',
                            image: ''
                        },
                        {
                            id: 'apply-defaults-to-selected',
                            name: 'Apply Defaults to Selected',
                            desc: 'Button in settings window. Applies current default settings to all selected OtMatic UVs components. Useful for updating multiple objects to match new defaults. Preserves individual settings that differ from defaults. Shows count of updated components.',
                            image: ''
                        },
                        {
                            id: 'reset-to-factory-defaults',
                            name: 'Reset to Factory Defaults',
                            desc: 'Button in settings window. Resets all default settings to factory values. Angle Threshold: 66°, Padding: 2, UV Scale: 1, Preserve Hard Edges: true, Auto Scale by Area: true. Useful for restoring original defaults or starting fresh.',
                            image: ''
                        }
                    ]
                }
            ]
        }
    ]
};

// Build image data store - one array per param
let imageData = {};
DOCS_DATA.panels.forEach(panel => {
    panel.groups.forEach(group => {
        group.params.forEach(param => {
            const key = `${panel.id}-${group.id}-${param.id}`;
            imageData[key] = param.image ? [param.image] : [];
        });
    });
});

// Load from localStorage
function loadImageData() {
    const stored = localStorage.getItem('otmatic_images');
    if (stored) {
        try {
            const data = JSON.parse(stored);
            Object.keys(data).forEach(key => {
                if (imageData.hasOwnProperty(key)) {
                    imageData[key] = data[key];
                }
            });
        } catch (e) {}
    }
}

function saveImageData() {
    localStorage.setItem('otmatic_images', JSON.stringify(imageData));
}

loadImageData();
