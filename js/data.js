/**
 * Rawteous Documentation Data
 * Comprehensive reference for all impostor generation parameters
 * Updated: January 2025
 * Version: 1.0.0
 */

const DOCS_DATA = {
    panels: [
        {
            id: 'impostor',
            name: 'Impostor',
            icon: '../Packages/com.voidoverzero.rawteous/UI/icons/square.png',
            description: 'Configure how angles are captured around your 3D object. Similar to taking photos from different viewpoints.',
            groups: [
                {
                    id: 'distribution',
                    name: 'Distribution',
                    description: 'Control how camera angles are placed around your object. More angles create smoother rotation but increase texture size.',
                    params: [
                        {
                            id: 'azimuth',
                            name: 'Azimuth',
                            desc: 'Number of horizontal capture angles around the object (4-32). More angles create smoother rotation but require more texture memory.',
                            image: 'images/params/azimuth.svg'
                        },
                        {
                            id: 'elevation',
                            name: 'Elevation',
                            desc: 'Number of vertical angles from top to bottom (1-17). Higher values provide better coverage when viewing from above or below.',
                            image: 'images/params/elevation.svg'
                        },
                        {
                            id: 'pole-scaling',
                            name: 'Pole Scaling',
                            desc: 'Controls vertical angle distribution (10-80). Lower values focus on sides, higher values focus on top and bottom. 50 provides uniform distribution.',
                            image: 'images/params/pole-scaling.svg'
                        },
                        {
                            id: 'horizontal-arch',
                            name: 'Horizontal Arch Limit',
                            desc: 'Angular range for horizontal capture (10-360°). Use 360° for full rotation or lower values for objects viewed from limited angles.',
                            image: 'images/params/horizontal-arch.svg'
                        },
                        {
                            id: 'hemisphere',
                            name: 'Hemisphere Only',
                            desc: 'Only captures the upper hemisphere. Useful for ground objects like vegetation that are never viewed from below. Reduces texture memory by half.',
                            image: 'images/params/hemisphere.svg'
                        },
                        {
                            id: 'distribution-mode',
                            name: 'Distribution Mode',
                            desc: 'Grid: Standard latitude/longitude arrangement. Fibonacci: Uniform sphere distribution that avoids clustering at poles.',
                            image: 'images/params/distribution-mode.svg'
                        },
                        {
                            id: 'fibonacci-points',
                            name: 'Fibonacci Points',
                            desc: 'Number of capture points for Fibonacci distribution (4-1024). Higher values provide more uniform coverage. Only applies when using Fibonacci mode.',
                            image: 'images/params/fibonacci-points.svg'
                        },
                        {
                            id: 'bent-normal',
                            name: 'Bent Normal Strength',
                            desc: 'Reduces specular light leaking in occluded areas (0-1). Flattens normals based on ambient occlusion strength.',
                            image: 'images/params/bent-normal.svg'
                        }
                    ]
                },
                {
                    id: 'texture',
                    name: 'Texture',
                    description: 'Configure output texture resolution, compression, and format. All processing happens on the GPU for fast performance.',
                    params: [
                        {
                            id: 'resolution',
                            name: 'Resolution',
                            desc: 'Size of each tile in the atlas (8-1024 pixels). Higher resolution captures more detail but increases memory usage.',
                            image: 'images/params/resolution.svg'
                        },
                        {
                            id: 'auto-resolution',
                            name: 'Auto Resolution',
                            desc: 'Automatically calculates optimal resolution based on object size. Larger objects receive higher resolution.',
                            image: 'images/params/auto-resolution.svg'
                        },
                        {
                            id: 'max-auto-res',
                            name: 'Max Auto Resolution',
                            desc: 'Maximum resolution cap when using Auto Resolution (8-2048). Prevents very large objects from generating excessive textures.',
                            image: 'images/params/max-auto-res.svg'
                        },
                        {
                            id: 'compression',
                            name: 'Compression',
                            desc: 'Texture compression format. Auto lets Unity choose, None preserves maximum quality, Normal uses standard compression, High Quality uses advanced formats.',
                            image: 'images/params/compression.svg'
                        },
                        {
                            id: 'quality',
                            name: 'Compression Quality',
                            desc: 'Compression quality level (0-100). Higher values produce better visual quality but larger file sizes.',
                            image: 'images/params/quality.svg'
                        },
                        {
                            id: 'file-format',
                            name: 'File Format',
                            desc: 'Output file format for saved textures. PNG provides lossless compression with universal support. Additional formats planned.',
                            image: 'images/params/file-format.svg'
                        }
                    ]
                },
                {
                    id: 'position',
                    name: 'Position',
                    description: 'Camera positioning and projection settings for capturing the source object.',
                    params: [
                        {
                            id: 'auto-position',
                            name: 'Auto Position',
                            desc: 'Automatically centers the billboard at the source object location. Disable for manual positioning control.',
                            image: 'images/params/auto-position.svg'
                        },
                        {
                            id: 'fov',
                            name: 'FOV',
                            desc: 'Camera field of view in degrees (3-120). Wider FOV captures more context but may introduce distortion. Narrower FOV reduces distortion.',
                            image: 'images/params/fov.svg'
                        },
                        {
                            id: 'orthographic',
                            name: 'Orthographic',
                            desc: 'Uses orthographic projection instead of perspective. Eliminates perspective distortion. Ideal for 2D-style games, pixel art, or isometric views.',
                            image: 'images/params/orthographic.svg'
                        },
                        {
                            id: 'ortho-size',
                            name: 'Orthographic Size',
                            desc: 'Half-height of the orthographic camera frustum (0.1-100). Larger values capture more of the scene. Only applies in orthographic mode.',
                            image: 'images/params/ortho-size.svg'
                        },
                        {
                            id: 'distance-method',
                            name: 'Distance Method',
                            desc: 'Camera distance calculation method. Spherical provides consistent results. Cube-Based handles elongated objects more accurately.',
                            image: 'images/params/distance-method.svg'
                        },
                        {
                            id: 'y-position-offset',
                            name: 'Y Position Offset',
                            desc: 'Vertical offset from object center (-1 to 1). Normalized relative to bounding box height. Useful for adjusting capture height.',
                            image: 'images/params/y-position-offset.svg'
                        },
                        {
                            id: 'camera-roll',
                            name: 'Camera Roll',
                            desc: 'Camera roll angle in degrees (-45 to 45). Rotates the camera around its forward axis.',
                            image: 'images/params/camera-roll.svg'
                        }
                    ]
                },
                {
                    id: 'padding',
                    name: 'Padding',
                    description: 'Control capture padding and billboard scale. Capture padding expands mesh geometry outward while keeping object pixel scale constant. Billboard padding increases billboard size to compensate.',
                    params: [
                        {
                            id: 'capture-padding',
                            name: 'Capture Padding',
                            desc: 'Expands billboard mesh vertices outward to add padding around captured content (0-1). Higher values = more padding. The capture frame includes padding, so object scale in pixels stays constant but takes up fewer pixels as padding increases. Geometry dilates outward. Default is 0.125 (12.5% expansion).',
                            image: 'images/params/capture-padding.svg'
                        },
                        {
                            id: 'billboard-padding',
                            name: 'Billboard Padding',
                            desc: 'Increases billboard size to compensate for capture frame reduction (0-1). Higher values = larger billboard. Scales the billboard quad outward. Default is 0.05 (5% increase).',
                            image: 'images/params/billboard-padding.svg'
                        }
                    ]
                }
            ]
        },
        {
            id: 'capture',
            name: 'Capture',
            icon: '../Packages/com.voidoverzero.rawteous/UI/icons/camera.png',
            description: 'Configure capture quality, shading modes, and anti-aliasing options for GPU-accelerated generation.',
            groups: [
                {
                    id: 'shading',
                    name: 'Shading',
                    description: 'Control how lighting information is captured and rendered on the impostor.',
                    params: [
                        {
                            id: 'shading-mode',
                            name: 'Shading Mode',
                            desc: 'Unlit captures color only for fast rendering. Lit captures full PBR data including normals, metallic, and smootness for dynamic lighting.',
                            image: 'images/params/shading-mode.svg'
                        },
                        {
                            id: 'capture-shadows',
                            name: 'Capture Shadows',
                            desc: 'Includes self-shadowing in captured textures. Useful for static lighting but prevents dynamic shadow updates.',
                            image: 'images/params/capture-shadows.svg'
                        },
                        {
                            id: 'translucency',
                            name: 'Translucency Strength',
                            desc: 'Subsurface scattering intensity (0-2). Simulates light passing through thin materials like leaves or fabric. Only available in Lit mode.',
                            image: 'images/params/translucency.svg'
                        },
                        {
                            id: 'bent-normal',
                            name: 'Bent Normal Strength',
                            desc: 'Bends normals toward the billboard plane based on ambient occlusion (0-1). Reduces specular light leaking in occluded areas. Higher values create flatter normals where AO is strong.',
                            image: 'images/params/bent-normal.svg'
                        },
                        {
                            id: 'ssao-ao',
                            name: 'SSAO → AO',
                            desc: 'Temporarily enables URP SSAO during capture and multiplies it into the AO channel. GPU-only operation. Lit mode only.',
                            image: 'images/params/ssao-ao.svg'
                        }
                    ]
                },
                {
                    id: 'quality',
                    name: 'Quality',
                    description: 'Anti-aliasing and supersampling settings for high-quality captures.',
                    params: [
                        {
                            id: 'quality-preset',
                            name: 'Quality Preset',
                            desc: 'Predefined quality configurations. Performance offers fastest capture, Balanced provides good quality-speed balance, High and Ultra increase quality at the cost of speed.',
                            image: 'images/params/quality-preset.svg'
                        },
                        {
                            id: 'super-sample',
                            name: 'Super-Sample',
                            desc: 'Render huge then shrink down (1x-4x). Makes edges buttery smooth but takes longer. 2x is the sweet spot for most stuff.',
                            image: 'images/params/super-sample.svg'
                        },
                        {
                            id: 'filter',
                            name: 'Downscaling Filter',
                            desc: 'How to shrink the super-sampled render. Bilinear = fast but soft. More filters coming soon (Lanczos for sharpness, Catmull-Rom for balance).',
                            image: 'images/params/filter.svg'
                        },
                        {
                            id: 'msaa',
                            name: 'MSAA',
                            desc: 'Hardware anti-aliasing (off, 2x, 4x, 8x). Smooths jagged edges. Works great with super-sampling. Higher = prettier but slower.',
                            image: 'images/params/msaa.svg'
                        },
                        {
                            id: 'fxaa',
                            name: 'FXAA',
                            desc: 'Fast approximate anti-aliasing applied after rendering. Less accurate than MSAA but very efficient. Works well combined with MSAA.',
                            image: 'images/params/fxaa.svg'
                        },
                        {
                            id: 'unfiltered-pixels',
                            name: 'Unfiltered Pixels',
                            desc: 'Crispy pixel-perfect look with zero blur. Perfect for pixel art or retro vibes. Turns off all filtering.',
                            image: 'images/params/unfiltered-pixels.svg'
                        }
                    ]
                },
                {
                    id: 'debug',
                    name: 'Debug',
                    description: 'Tools to see what\'s going on under the hood. For when things look weird.',
                    params: [
                        {
                            id: 'bake-numbers',
                            name: 'Bake Tile Numbers',
                            desc: 'Print tile numbers right on the texture. Super handy for figuring out which angle is showing from where.',
                            image: 'images/params/bake-numbers.svg'
                        },
                        {
                            id: 'debug-view',
                            name: 'Debug View Mode',
                            desc: 'View different channels: Albedo, Normals, Metal/Rough/AO, Depth, UVs, whatever. Great for debugging weird lighting or texture issues.',
                            image: 'images/params/debug-view.svg'
                        }
                    ]
                }
            ]
        },
        {
            id: 'postprocess',
            name: 'Post Process',
            icon: '../Packages/com.voidoverzero.rawteous/UI/icons/tv-minimal-play.png',
            description: 'Apply GPU-accelerated post-processing to improve texture quality and add visual effects.',
            groups: [
                {
                    id: 'edge',
                    name: 'Edge Processing',
                    description: 'Clean up edges and prevent those annoying black halos. All GPU-powered.',
                    params: [
                        {
                            id: 'edge-dilation',
                            name: 'Edge Dilation',
                            desc: 'Grow the edges into transparent areas (0-32px). Fixes black outlines when mipmaps kick in. 1-4 is usually perfect.',
                            image: 'images/params/edge-dilation.svg'
                        },
                        {
                            id: 'sharpen',
                            name: 'Sharpen',
                            desc: 'Bring back details lost in downsampling (0-10). Don\'t overdo it or you\'ll get halos. Great for fixing super-sample softness.',
                            image: 'images/params/sharpen.svg'
                        },
                        {
                            id: 'denoise',
                            name: 'Denoise',
                            desc: 'Smooth out noise and grain (0-1). Higher = more blur. Good for cleaning up grainy captures.',
                            image: 'images/params/denoise.svg'
                        }
                    ]
                }
            ]
        },
        {
            id: 'billboard',
            name: 'Billboard',
            icon: '../Packages/com.voidoverzero.rawteous/UI/icons/layers.png',
            description: 'How the billboard behaves in your game. Blending, depth sorting, LOD stuff.',
            groups: [
                {
                    id: 'mode',
                    name: 'Rendering Mode',
                    description: 'How angles snap and blend when you rotate around them.',
                    params: [
                        {
                            id: 'impostor-mode',
                            name: 'Impostor Mode',
                            desc: 'TextureBased = classic sprite sheet with discrete angles. SmoothBlending = interpolates between angles for buttery smooth rotation.',
                            image: 'images/params/impostor-mode.svg'
                        },
                        {
                            id: 'blending-mode',
                            name: 'Blending Mode',
                            desc: 'How we blend between angles. Linear = fast. Smoothstep = smoother. Barycentric = 3-way blend (like Amplify). Spherical = best for normals.',
                            image: 'images/params/blending-mode.svg'
                        },
                        {
                            id: 'step-rotation',
                            name: 'Step Rotation',
                            desc: 'Billboard snaps to discrete angles instead of smooth rotation. Creates a retro sprite effect, ideal for stylized or pixel-art games.',
                            image: 'images/params/step-rotation.svg'
                        }
                    ]
                },
                {
                    id: 'depth',
                    name: 'Depth Buffer',
                    description: 'Control how the billboard interacts with the depth buffer for proper rendering order.',
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
                        }
                    ]
                },
                {
                    id: 'lod',
                    name: 'LOD Integration',
                    description: 'Level of detail transition settings and LOD Group integration.',
                    params: [
                        {
                            id: 'cross-fade',
                            name: 'LOD Cross-Fade',
                            desc: 'Enable dithered cross-fading between LOD levels. Creates smoother transitions using a checkerboard pattern. Requires shader LOD_FADE_CROSSFADE support.',
                            image: 'images/params/cross-fade.svg'
                        },
                        {
                            id: 'join-lod',
                            name: 'Join LOD Group',
                            desc: 'Add this impostor as the furthest LOD automatically. Perfect combo: detailed up close, impostor far away.',
                            image: 'images/params/join-lod.svg'
                        },
                        {
                            id: 'lod-percentage',
                            name: 'LOD Percentage',
                            desc: 'Screen height threshold for impostor LOD level (0-1). Lower values activate the impostor when objects are further away.',
                            image: 'images/params/lod-percentage.svg'
                        }
                    ]
                }
            ]
        },
        {
            id: 'cast',
            name: 'Cast',
            icon: '../Packages/com.voidoverzero.rawteous/UI/icons/vector-square.png',
            description: 'Generate custom meshes that match your object\'s silhouette instead of boring squares.',
            groups: [
                {
                    id: 'generation',
                    name: 'Cast Generation',
                    description: 'How we trace and simplify your object\'s outline into a mesh.',
                    params: [
                        {
                            id: 'cast-mode',
                            name: 'Cast Mode',
                            desc: 'Per-Angle generates unique mesh for each angle (most accurate). Combined creates single mesh for all angles. Per-Piece is experimental. GPU-accelerated processing.',
                            image: 'images/params/cast-mode.svg'
                        },
                        {
                            id: 'cast-threshold',
                            name: 'Cast Threshold',
                            desc: 'Alpha threshold for silhouette extraction (0-1). Lower values capture more edge detail, higher values create tighter silhouettes.',
                            image: 'images/params/cast-threshold.svg'
                        },
                        {
                            id: 'cast-dilation',
                            name: 'Cast Dilation',
                            desc: 'Grow the mesh outward a bit (0-100). Prevents gaps between mesh and texture edges.',
                            image: 'images/params/cast-dilation.svg'
                        },
                        {
                            id: 'cast-point-reduction',
                            name: 'Point Reduction',
                            desc: 'Cut down vertex count (0-100). Higher = simpler mesh. Great for performance.',
                            image: 'images/params/simplification.svg'
                        },
                        {
                            id: 'cast-enabled',
                            name: 'Enable Cast',
                            desc: 'Enable cast mesh generation. When enabled, generates silhouette-accurate meshes instead of simple quads for better occlusion and shape accuracy.',
                            image: 'images/params/cast-enabled.svg'
                        }
                    ]
                },
                {
                    id: 'streaming',
                    name: 'Texture Streaming',
                    description: 'Unity texture streaming settings for memory-efficient mipmap management.',
                    params: [
                        {
                            id: 'enable-streaming',
                            name: 'Enable Streaming',
                            desc: 'Enable Unity\'s texture streaming for dynamic mipmap loading. Automatically streams mipmaps based on visibility and distance to reduce memory usage.',
                            image: 'images/params/streaming.svg'
                        },
                        {
                            id: 'priority',
                            name: 'Streaming Priority',
                            desc: 'Streaming priority (-128 to 127). Higher priority textures load higher resolution mipmaps first. Use higher values for important objects.',
                            image: 'images/params/priority.svg'
                        }
                    ]
                }
            ]
        },
        {
            id: 'channel-packing',
            name: 'Channel Packing',
            icon: '../Packages/com.voidoverzero.rawteous/UI/icons/channel-packing.png',
            description: 'Configure how texture channels are packed into output maps. Customize PBRMap and ExportMap channel sources.',
            groups: [
                {
                    id: 'pbrmap',
                    name: 'PBRMap',
                    description: 'Configure channel sources for the PBR map. Default packing is R=Metallic, G=Smoothness, B=AO, A=Depth.',
                    params: [
                        {
                            id: 'pbrmap-channels',
                            name: 'PBRMap Channels',
                            desc: 'Configure RGBA channel sources. Default: R=Metallic, G=Smoothness, B=AO, A=Depth. Each channel can be set independently from available sources: Metallic, Smoothness, AO, Depth, Emission, Albedo, Normal, Translucency, or custom data.',
                            image: 'images/params/pbrmap-r.svg'
                        }
                    ]
                },
                {
                    id: 'exportmap',
                    name: 'ExportMap',
                    description: 'Configure channel sources for an additional export map with custom channel packing.',
                    params: [
                        {
                            id: 'exportmap-channels',
                            name: 'ExportMap Channels',
                            desc: 'Configure RGBA channel sources for a custom export map. Each channel (R, G, B, A) can be set to any captured channel source: Metallic, Smoothness, AO, Depth, Emission (R/G/B), Albedo (R/G/B/Alpha), Normal (R/G/B), Translucency, Vertex Colors, Texcoords, or custom shader data. Perfect for custom workflows like ORM maps (R=Occlusion, G=Roughness, B=Metallic) or any other packing scheme.',
                            image: 'images/params/exportmap-r.svg'
                        }
                    ]
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
                            id: 'create-as-child-button',
                            name: 'Create Impostors Button',
                            desc: 'Create Rawteous impostors from selected objects. Adds Rawteous components to the selection.',
                        },
                        {
                            id: 'create-skip-prefabs-button',
                            name: 'Create Skip Prefabs Button',
                            desc: 'Create impostors while skipping prefab assets. Useful for batch processing scene objects.',
                        },
                        {
                            id: 'regenerate-all-button',
                            name: 'Regenerate All Button',
                            desc: 'Regenerate all impostors in the scene. Useful after changing global settings or updating source objects.',
                        },
                        {
                            id: 'delete-all-button',
                            name: 'Delete All Button',
                            desc: 'Button to delete all Rawteous objects from the scene. Use with caution - this removes all impostors.',
                        },
                        {
                            id: 'grid-bin-button',
                            name: 'Grid Bin Button',
                            desc: 'Toggle grid bin visualization. Shows how impostors are organized in the atlas grid.',
                        },
                        {
                            id: 'toggle-impostors-only-button',
                            name: 'Toggle Impostors Only Button',
                            desc: 'Toggle to show only impostor billboards, hiding source objects. Useful for previewing the final result.',
                        },
                        {
                            id: 'toggle-auto-resolution-button',
                            name: 'Toggle Auto Resolution Button',
                            desc: 'Toggle automatic resolution calculation. When enabled, resolution is calculated based on object size.',
                        },
                        {
                            id: 'debug-popup-button',
                            name: 'Debug Popup Button',
                            desc: 'Open the debug popup menu. Provides access to debug visualization modes and diagnostic tools.',
                        },
                        {
                            id: 'set-leadership-button',
                            name: 'Set Leadership Button',
                            desc: 'Set leadership from selected objects. Last selected becomes leader, others become followers.',
                        },
                        {
                            id: 'disconnect-leadership-button',
                            name: 'Disconnect Leadership Button',
                            desc: 'Disconnect leadership from selected objects, making them independent again.',
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
