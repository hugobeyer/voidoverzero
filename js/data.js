/**
 * Rawteous Documentation Data
 * Comprehensive reference for all impostor generation parameters
 * Updated: January 2025
 * Version: 1.0.0
 *
 * NOTE: This documentation matches the current inspector structure.
 * Some parameters may be deprecated or moved to different sections.
 */

const DOCS_DATA = {
    panels: [
        {
            id: 'impostor',
            name: 'Impostor',
            icon: '../Packages/com.voidoverzero.rawteousimpostors/UI/icons/square.png',
            description: 'Basic impostor settings and texture resolution configuration.',
            groups: [
                {
                    id: 'impostor-settings',
                    name: 'Impostor Settings',
                    description: 'Configure texture resolution for the impostor atlas.',
                    params: [
                        {
                            id: 'texture-resolution',
                            name: 'Texture Resolution',
                            desc: 'Resolution level for each tile in the atlas (0-8). Maps to resolutions: 8, 16, 32, 64, 128, 256, 512, 1024 pixels. Higher resolution captures more detail but increases memory usage.',
                            image: 'images/params/resolution.svg'
                        }
                    ]
                },
                {
                    id: 'debug',
                    name: 'Debug',
                    description: 'Debug visualization options for the impostor system.',
                    params: [
                        {
                            id: 'show-gizmos',
                            name: 'Show Gizmos',
                            desc: 'Display camera gizmos in the Scene view showing capture positions and angles (0-1). 0 = hidden, 1 = visible. Useful for visualizing how the impostor is captured.',
                            image: 'images/params/debug-view.svg'
                        }
                    ]
                }
            ]
        },
        {
            id: 'capture',
            name: 'Capture',
            icon: '../Packages/com.voidoverzero.rawteousimpostors/UI/icons/camera.png',
            description: 'Configure capture distribution, angles, and capture options for GPU-accelerated generation.',
            groups: [
                {
                    id: 'capture',
                    name: 'Capture',
                    description: 'Control how camera angles are distributed around your object and capture settings.',
                    params: [
                        {
                            id: 'distribution-mode',
                            name: 'Distribution Mode',
                            desc: 'Grid: Standard latitude/longitude arrangement. Fibonacci: Uniform sphere distribution that avoids clustering at poles.',
                            image: 'images/params/distribution-mode.svg'
                        },
                        {
                            id: 'capture-angles',
                            name: 'Capture Angles',
                            desc: 'Number of horizontal capture angles around the object (4-128). More angles create smoother rotation but require more texture memory. Only applies in Grid mode.',
                            image: 'images/params/azimuth.svg'
                        },
                        {
                            id: 'capture-elevations',
                            name: 'Capture Elevations',
                            desc: 'Number of vertical angles from top to bottom (1-33). Higher values provide better coverage when viewing from above or below. Only applies in Grid mode.',
                            image: 'images/params/elevation.svg'
                        },
                        {
                            id: 'fibonacci-points',
                            name: 'Fibonacci Points',
                            desc: 'Number of capture points for Fibonacci distribution (4-1024). Higher values provide more uniform coverage. Only applies when using Fibonacci mode.',
                            image: 'images/params/fibonacci-points.svg'
                        },
                        {
                            id: 'hemisphere-only',
                            name: 'Hemisphere Only',
                            desc: 'Only captures the upper hemisphere. Useful for ground objects like vegetation that are never viewed from below. Reduces texture memory by half. Only applies in Grid mode.',
                            image: 'images/params/hemisphere.svg'
                        },
                        {
                            id: 'pole-scaling',
                            name: 'Pole Scaling',
                            desc: 'Controls vertical angle distribution (10-80). Lower values focus on sides, higher values focus on top and bottom. 50 provides uniform distribution. Only applies in Grid mode.',
                            image: 'images/params/pole-scaling.svg'
                        },
                        {
                            id: 'horizontal-arch-limit',
                            name: 'Horizontal Arch Limit',
                            desc: 'Angular range for horizontal capture (10-360°). Use 360° for full rotation or lower values for objects viewed from limited angles. Only applies in Grid mode.',
                            image: 'images/params/horizontal-arch.svg'
                        },
                        {
                            id: 'capture-lights-as-emissive',
                            name: 'Capture Lights As Emissive',
                            desc: 'Captures dynamic lights as emissive color in the texture. Useful for static lighting scenarios.',
                            image: 'images/params/capture-shadows.svg'
                        },
                        {
                            id: 'capture-frame-reduction',
                            name: 'Capture Frame Reduction',
                            desc: 'Reduces the capture frame size (0-1). Higher values capture less of the scene, effectively zooming in. Lower values capture more context.',
                            image: 'images/params/capture-padding.svg'
                        },
                        {
                            id: 'translucency-strength',
                            name: 'Translucency Strength',
                            desc: 'Subsurface scattering intensity (0-2). Simulates light passing through thin materials like leaves or fabric.',
                            image: 'images/params/translucency.svg'
                        }
                    ]
                }
            ]
        },
        {
            id: 'postprocess',
            name: 'Post Process',
            icon: '../Packages/com.voidoverzero.rawteousimpostors/UI/icons/tv-minimal-play.png',
            description: 'Apply GPU-accelerated post-processing to improve texture quality and add visual effects.',
            groups: [
                {
                    id: 'post-process',
                    name: 'Post Process',
                    description: 'Post-processing effects applied to captured textures. All GPU-powered for fast performance.',
                    params: [
                        {
                            id: 'edge-dilation-radius',
                            name: 'Edge Dilation Radius',
                            desc: 'Grow the edges into transparent areas (0-256px). Fixes black outlines when mipmaps kick in. 1-4 is usually perfect.',
                            image: 'images/params/edge-dilation.svg'
                        },
                        {
                            id: 'gamma',
                            name: 'Gamma',
                            desc: 'Gamma correction (0.1-3.0). Adjusts brightness curve. Values below 1.0 brighten, above 1.0 darken. Default is 1.0.',
                            image: 'images/params/gamma.svg'
                        },
                        {
                            id: 'saturation',
                            name: 'Saturation',
                            desc: 'Color saturation (0-2). 0 = grayscale, 1 = normal, 2 = oversaturated. Adjusts color intensity.',
                            image: 'images/params/saturation.svg'
                        },
                        {
                            id: 'hue',
                            name: 'Hue',
                            desc: 'Hue shift in degrees (-180 to 180). Rotates colors around the color wheel. 0 = no change.',
                            image: 'images/params/hue.svg'
                        },
                        {
                            id: 'sharpen-strength',
                            name: 'Sharpen Strength',
                            desc: 'Sharpening intensity (0-10). Brings back details lost in downsampling. Don\'t overdo it or you\'ll get halos. Great for fixing softness.',
                            image: 'images/params/sharpen.svg'
                        },
                        {
                            id: 'denoise-strength',
                            name: 'Denoise Strength',
                            desc: 'Denoising intensity (0-1). Smooths out noise and grain. Higher = more blur. Good for cleaning up grainy captures.',
                            image: 'images/params/denoise.svg'
                        },
                        {
                            id: 'denoise-passes',
                            name: 'Denoise Passes',
                            desc: 'Number of denoising passes (1-5). More passes = smoother result but slower processing.',
                            image: 'images/params/denoise.svg'
                        }
                    ]
                }
            ]
        },
        {
            id: 'billboard',
            name: 'Billboard',
            icon: '../Packages/com.voidoverzero.rawteousimpostors/UI/icons/square.png',
            description: 'Configure how the billboard renders in your game. Depth testing, alpha blending, and LOD integration.',
            groups: [
                {
                    id: 'billboard-settings',
                    name: 'Billboard Settings',
                    description: 'Rendering settings for the billboard impostor.',
                    params: [
                        {
                            id: 'depth-test',
                            name: 'Depth Test',
                            desc: 'Test against depth buffer for correct sorting with other geometry. Enable for proper occlusion. Disable only for special effects.',
                            image: 'images/params/depth-test.svg'
                        },
                        {
                            id: 'depth-write',
                            name: 'Depth Write',
                            desc: 'Write to depth buffer so other geometry can sort against the impostor. Enable if objects need to be occluded by the impostor. Usually disabled for transparent billboards.',
                            image: 'images/params/depth-write.svg'
                        },
                        {
                            id: 'alpha-blend',
                            name: 'Alpha Blend',
                            desc: 'Enable alpha blending for transparent billboards. Required for objects with transparency.',
                            image: 'images/params/alpha-blend.svg'
                        },
                        {
                            id: 'alpha-test',
                            name: 'Alpha Test',
                            desc: 'Enable alpha testing to discard pixels below a threshold. Useful for cutout transparency.',
                            image: 'images/params/alpha-test.svg'
                        }
                    ]
                },
                {
                    id: 'lod-settings',
                    name: 'LOD Settings',
                    description: 'Level of detail transition settings and LOD Group integration.',
                    params: [
                        {
                            id: 'join-lod-group',
                            name: 'Join LOD Group',
                            desc: 'Add this impostor as the furthest LOD automatically. Perfect combo: detailed up close, impostor far away.',
                            image: 'images/params/join-lod.svg'
                        },
                        {
                            id: 'lod-percentage',
                            name: 'LOD Percentage',
                            desc: 'Screen height threshold for impostor LOD level (0.01-1). Lower values activate the impostor when objects are further away.',
                            image: 'images/params/lod-percentage.svg'
                        },
                        {
                            id: 'max-lod-additions',
                            name: 'Max LOD Additions',
                            desc: 'Maximum number of LOD levels to add (1-5). Controls how many LOD levels the impostor can occupy.',
                            image: 'images/params/max-lod-additions.svg'
                        }
                    ]
                }
            ]
        },
        {
            id: 'cast',
            name: 'Cast',
            icon: '../Packages/com.voidoverzero.rawteousimpostors/UI/icons/vector-square.png',
            description: 'Experimental cast mesh generation. Currently not available in the inspector.',
            groups: [
                {
                    id: 'cast-info',
                    name: 'Cast Information',
                    description: 'Cast mesh generation is planned for future releases. This section will contain settings for generating custom meshes that match your object\'s silhouette.',
                    params: []
                }
            ]
        },
        {
            id: 'workflow',
            name: 'Workflow',
            icon: '../Packages/com.voidoverzero.rawteous/UI/icons/workflow.png',
            description: 'How and when things update, plus some handy multi-object tricks.',
            groups: [
                {
                    id: 'regeneration',
                    name: 'Regeneration',
                    description: 'Control when and how impostor regeneration occurs.',
                    params: [
                        {
                            id: 'regen-mode',
                            name: 'Regeneration Mode',
                            desc: 'OnMouseUp = update when you release slider (smooth, recommended). Off = manual only. OnChange = instant updates (can lag). RealTime = live preview (cool but heavy).',
                            image: 'images/params/regen-mode.svg'
                        }
                    ]
                },
                {
                    id: 'source',
                    name: 'Source Object',
                    description: 'Settings for handling the source object during impostor generation.',
                    params: [
                        {
                            id: 'visibility-mode',
                            name: 'Source Visibility',
                            desc: 'Auto hides in Scene View using SceneVisibilityManager. Hidden disables completely. Visible keeps the object shown. Choose based on your workflow needs.',
                            image: 'images/params/visibility-mode.svg'
                        }
                    ]
                }
            ]
        },
        {
            id: 'leader',
            name: 'Leadership',
            icon: '../Packages/com.voidoverzero.rawteous/UI/icons/group.png',
            description: 'Link multiple impostors to share settings from a leader object. Perfect for forests, crowds, or any time you want consistent impostors.',
            groups: [
                {
                    id: 'leadership',
                    name: 'Leader-Follower',
                    description: 'Link multiple impostors to share settings from a leader object.',
                    params: [
                        {
                            id: 'leader',
                            name: 'Leader',
                            desc: 'Pick a "leader" object and this one copies all its settings. Perfect for forests, crowds, or any time you want consistent impostors.',
                            image: 'images/params/leader.svg'
                        },
                        {
                            id: 'set-leadership',
                            name: 'Set Leadership from Selection',
                            desc: 'Set leadership from selected objects. Last selected becomes leader, others become followers. Access via overlay menu.',
                        },
                        {
                            id: 'disconnect-leadership',
                            name: 'Disconnect Leadership',
                            desc: 'Disconnect leadership from selected objects, making them independent again. Access via overlay menu.',
                        }
                    ]
                }
            ]
        },
        {
            id: 'overlay-menu',
            name: 'Overlay Menu',
            icon: '../Packages/com.voidoverzero.rawteous/UI/icons/menu.png',
            description: 'Context menu and overlay controls for quick access to common impostor operations.',
            groups: [
                {
                    id: 'overlay-controls',
                    name: 'Overlay Controls',
                    description: 'Buttons available in the overlay menu.',
                    params: [
                        {
                            id: 'delete-all-button',
                            name: 'Delete All Button',
                            desc: 'Button to delete all Rawteous objects from the scene. Use with caution - this removes all impostors.',
                        }
                    ]
                }
            ]
        },
        {
            id: 'presets',
            name: 'Presets',
            icon: '../Packages/com.voidoverzero.rawteous/UI/icons/bookmark-check.png',
            description: 'Save and load preset configurations for quick setup of common impostor settings.',
            groups: [
                {
                    id: 'preset-management',
                    name: 'Preset Management',
                    description: 'Preset Manager window buttons for managing presets.',
                    params: [
                        {
                            id: 'preset-name-field',
                            name: 'Preset Name Field',
                            desc: 'TextField for entering the name of a new preset when adding.',
                        },
                        {
                            id: 'add-preset-button',
                            name: 'Add Preset Button',
                            desc: 'Button to create a new preset with the name entered in the Preset Name Field.',
                        },
                        {
                            id: 'load-preset-button',
                            name: 'Load Preset Button',
                            desc: 'Button to load the selected preset and apply its settings. Enabled when a preset is selected.',
                        },
                        {
                            id: 'duplicate-preset-button',
                            name: 'Duplicate Preset Button',
                            desc: 'Button to create a copy of the selected preset. Enabled when a preset is selected.',
                        },
                        {
                            id: 'rename-preset-button',
                            name: 'Rename Preset Button',
                            desc: 'Button to rename the selected preset. Enabled when a preset is selected (except Main Preset).',
                        },
                        {
                            id: 'delete-preset-button',
                            name: 'Delete Preset Button',
                            desc: 'Button to delete the selected preset. Enabled when a preset is selected (except Main Preset).',
                        }
                    ]
                }
            ]
        },
        {
            id: 'atlas-viewer',
            name: 'Atlas Viewer',
            icon: '../Packages/com.voidoverzero.rawteous/UI/icons/eye.png',
            description: 'Visualize and inspect the generated impostor atlas textures.',
            groups: [
                {
                    id: 'top-bar',
                    name: 'Top Bar',
                    description: 'Information labels and controls in the top bar.',
                    params: [
                        {
                            id: 'texture-bounds-label',
                            name: 'Texture Bounds Label',
                            desc: 'Label displaying the texture dimensions (width × height) of the atlas texture.',
                        },
                        {
                            id: 'utilized-bounds-label',
                            name: 'Utilized Bounds Label',
                            desc: 'Label displaying the grid dimensions (columns × rows) showing how the atlas is utilized.',
                        },
                        {
                            id: 'debug-view-mode-dropdown',
                            name: 'Debug View Mode Dropdown',
                            desc: 'EnumField dropdown to switch between different debug visualization modes (Shaded, Wireframe, UV, Normal, etc.).',
                        },
                        {
                            id: 'tile-size-label',
                            name: 'Tile Size Label',
                            desc: 'Label displaying the size of each tile in pixels.',
                        },
                        {
                            id: 'total-captures-label',
                            name: 'Total Captures Label',
                            desc: 'Label displaying the total number of capture tiles in the atlas.',
                        }
                    ]
                },
                {
                    id: 'bottom-bar',
                    name: 'Bottom Bar',
                    description: 'Information labels and toggles in the bottom bar.',
                    params: [
                        {
                            id: 'capture-angles-label',
                            name: 'Capture Angles Label',
                            desc: 'Label displaying the number of azimuth (horizontal) capture angles.',
                        },
                        {
                            id: 'capture-elevations-label',
                            name: 'Capture Elevations Label',
                            desc: 'Label displaying the number of elevation (vertical) capture angles.',
                        },
                        {
                            id: 'show-tile-numbers-toggle',
                            name: 'Show Tile Numbers Toggle',
                            desc: 'Toggle to display capture angle and elevation numbers on each tile in the atlas.',
                        },
                        {
                            id: 'show-alpha-toggle',
                            name: 'Show Alpha Toggle',
                            desc: 'Toggle to display the alpha channel of textures. Useful for checking transparency and edge quality.',
                        },
                        {
                            id: 'show-wireframe-toggle',
                            name: 'Show Wireframe Toggle',
                            desc: 'Toggle to display wireframe overlay on the atlas. Helps visualize mesh structure and capture boundaries.',
                        },
                        {
                            id: 'resolution-label',
                            name: 'Resolution Label',
                            desc: 'Label displaying the resolution of the current view or selected tile.',
                        },
                        {
                            id: 'current-tile-index-label',
                            name: 'Current Tile Index Label',
                            desc: 'Label displaying the index of the currently selected tile (shows "—" when no tile is selected).',
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
    const stored = localStorage.getItem('rawteous_images');
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
    localStorage.setItem('rawteous_images', JSON.stringify(imageData));
}

loadImageData();
