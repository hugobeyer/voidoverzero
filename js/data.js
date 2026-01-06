/**
 * Rawteous Documentation Data
 * Comprehensive reference for all impostor generation parameters
 * Updated: January 2025
 * Version: 2.0.0
 *
 * This documentation matches EXACTLY what is visible in the Unity Inspector.
 * All parameters are based on the actual inspector UI setup code.
 */

const DOCS_DATA = {
    panels: [
        {
            id: 'quality',
            name: 'Quality',
            icon: '../Packages/com.voidoverzero.rawteousimpostors/UI/icons/square.png',
            description: 'Texture resolution and quality settings for the impostor atlas.',
            groups: [
                {
                    id: 'quality-settings',
                    name: 'Settings',
                    description: 'Configure texture resolution and quality options for the impostor atlas.',
                    params: [
                        {
                            id: 'texture-resolution',
                            name: 'Texture Resolution',
                            desc: 'Resolution of each tile in the atlas. Must be power of 2: 8, 16, 32, 64, 128, 256, 512, 1024 pixels. Higher resolution captures more detail but increases memory usage. Range: 8-1024.',
                            image: 'images/params/resolution.svg'
                        },
                        {
                            id: 'auto-resolution',
                            name: 'Auto Resolution',
                            desc: 'Automatically calculate resolution from bounding box size. When enabled, resolution is calculated based on object size and clamped to max auto resolution. Disables manual texture resolution setting.',
                            image: 'images/params/auto-resolution.svg'
                        },
                        {
                            id: 'max-auto-resolution',
                            name: 'Max Auto Resolution',
                            desc: 'Maximum resolution when auto resolution is enabled. Resolution will be calculated from bounds but clamped to this maximum value. Range: 8-2048.',
                            image: 'images/params/max-auto-resolution.svg'
                        },
                        {
                            id: 'super-sampling-multiplier',
                            name: 'Super-Sample',
                            desc: 'Render at higher resolution then downscale for better quality. 0 = Disabled (1x), 1 = 1.5x, 2 = 2x, 3 = 3x, 4 = 4x. Higher values = better quality but slower capture. Range: 0-4.',
                            image: 'images/params/super-sampling.svg'
                        },
                        {
                            id: 'downscaling-filter',
                            name: 'Filter',
                            desc: 'Method used when super-sampling is enabled. 0 = Bilinear (fastest), 1 = Lanczos (best quality), 2 = CatmullRom (sharp). Range: 0-2.',
                            image: 'images/params/downscaling-filter.svg'
                        }
                    ]
                }
            ]
        },
        {
            id: 'impostor',
            name: 'Impostor',
            icon: '../Packages/com.voidoverzero.rawteousimpostors/UI/icons/square.png',
            description: 'Capture distribution and angle configuration for impostor generation.',
            groups: [
                {
                    id: 'impostor-settings',
                    name: 'Impostor Settings',
                    description: 'Control how camera angles are distributed around your object and capture settings.',
                    params: [
                        {
                            id: 'capture-distribution',
                            name: 'Capture Distribution',
                            desc: 'Distribution mode for capture angles. Grid = Standard latitude/longitude arrangement. Fibonacci = Uniform sphere distribution that avoids clustering at poles. Octahedron = Continuous octahedron mapping. HemiOctahedron = Top hemisphere octahedron. Range: 0-3.',
                            image: 'images/params/distribution-mode.svg'
                        },
                        {
                            id: 'capture-angles',
                            name: 'Azimuth',
                            desc: 'Number of horizontal azimuth angles to capture. Valid values: 4, 6, 8, 12, 16, 20, 24, 32, 48, 64, 80, 96, 128. More angles create smoother rotation but require more texture memory. Only applies in Grid mode. Range: 4-128.',
                            image: 'images/params/azimuth.svg'
                        },
                        {
                            id: 'capture-elevations',
                            name: 'Elevation',
                            desc: 'Number of vertical elevation angles to capture. Valid values: 1 (Lowest), 3 (Low), 5 (Average), 9 (Medium), 11 (High), 15 (Very High), 17 (Ultra), 21, 25, 29, 33 (Extreme). Higher values provide better coverage when viewing from above or below. Only applies in Grid mode. Range: 1-33.',
                            image: 'images/params/elevation.svg'
                        },
                        {
                            id: 'hemisphere-only',
                            name: 'Hemisphere Only',
                            desc: 'Capture only the top hemisphere (0-90 degrees elevation). When enabled, only captures views from above the horizon, useful for objects that are never viewed from below. Reduces texture memory by half. Only applies in Grid mode.',
                            image: 'images/params/hemisphere.svg'
                        },
                        {
                            id: 'fibonacci-points',
                            name: 'Points',
                            desc: 'Number of Fibonacci points to capture (Fibonacci distribution). Replaces Azimuth/Elevation grid. Common values: 16, 32, 64, 128, 256. Higher values provide more uniform coverage. Only applies when using Fibonacci distribution. Range: 4-1024.',
                            image: 'images/params/fibonacci-points.svg'
                        },
                        {
                            id: 'octahedron-resolution',
                            name: 'Octahedron Resolution',
                            desc: 'Grid size for octahedron capture (e.g., 8 = 8x8 = 64 samples, 16 = 16x16 = 256 samples). Higher = better quality but more captures. Only applies when using Octahedron or HemiOctahedron distribution. Range: 4-32.',
                            image: 'images/params/octahedron-resolution.svg'
                        },
                        {
                            id: 'pole-scaling',
                            name: 'Pole Scaling',
                            desc: 'Scales the elevation range up or down the sphere. Lower values = compressed range (less coverage), higher values = expanded range (more coverage). 50 = no scaling. Range: 10-80. Only applies in Grid mode.',
                            image: 'images/params/pole-scaling.svg'
                        },
                        {
                            id: 'horizontal-arch-limit',
                            name: 'Horizontal Arch Limit',
                            desc: 'Limits azimuth range to focus on front view. 360 = full 360 degrees, lower values = limited range centered on front. Prioritizes front-facing views. Range: 10-360 degrees. Only applies in Grid mode.',
                            image: 'images/params/horizontal-arch.svg'
                        }
                    ]
                }
            ]
        },
        {
            id: 'lod',
            name: 'LOD',
            icon: '../Packages/com.voidoverzero.rawteousimpostors/UI/icons/square.png',
            description: 'Level of detail settings and LOD Group integration.',
            groups: [
                {
                    id: 'lod-settings',
                    name: 'LOD Settings',
                    description: 'Automatically join the source object\'s LOD Group as the furthest LOD level.',
                    params: [
                        {
                            id: 'join-lod-group',
                            name: 'Join LOD Group',
                            desc: 'Automatically join the source object\'s LOD Group as the furthest LOD level. When enabled, the impostor will be added to the LOD Group at the configured LOD percentage.',
                            image: 'images/params/join-lod.svg'
                        },
                        {
                            id: 'lod-percentage',
                            name: 'LOD Percentage',
                            desc: 'Screen height threshold (0-1) for impostor LOD level when joining LOD Group. Lower values activate the impostor when objects are further away. Default is 0.05 (5% screen height). Range: 0.01-1.',
                            image: 'images/params/lod-percentage.svg'
                        },
                        {
                            id: 'max-lod-additions',
                            name: 'Max LOD Additions',
                            desc: 'Maximum number of times the impostor can be added to the LOD Group. Prevents creating too many duplicate LOD entries. Range: 1-5.',
                            image: 'images/params/max-lod-additions.svg'
                        }
                    ]
                }
            ]
        },
        {
            id: 'capture',
            name: 'Capture',
            icon: '../Packages/com.voidoverzero.rawteousimpostors/UI/icons/camera.png',
            description: 'Capture frame settings and bounds configuration.',
            groups: [
                {
                    id: 'capture',
                    name: 'Capture',
                    description: 'Control capture frame size and bounds editing.',
                    params: [
                        {
                            id: 'capture-frame-reduction',
                            name: 'Capture Padding',
                            desc: 'Capture padding (0-1). Expands billboard mesh vertices outward to add padding around captured content. Higher values = more padding. Capture frame stays intact. Default is 0.25 (25% vertex expansion). Range: 0-1.',
                            image: 'images/params/capture-padding.svg'
                        },
                        {
                            id: 'edit-bounds',
                            name: 'Edit Bounds',
                            desc: 'Enable bounds editing mode. When enabled, shows transform handles and radius dragger in scene view to manually adjust capture bounds.',
                            image: 'images/params/edit-bounds.svg'
                        },
                        {
                            id: 'use-edit-bounds',
                            name: 'Use Edit Bounds',
                            desc: 'Use custom edited bounds instead of automatically calculated bounds. When enabled, the manually positioned bounds sphere will be used for capture.',
                            image: 'images/params/use-edit-bounds.svg'
                        }
                    ]
                }
            ]
        },
        {
            id: 'postprocess',
            name: 'Post Process',
            icon: '../Packages/com.voidoverzero.rawteousimpostors/UI/icons/tv-minimal-play.png',
            description: 'Post-processing effects for texture quality improvement.',
            groups: [
                {
                    id: 'post-process',
                    name: 'Post Process',
                    description: 'Post-processing effects applied to captured textures. All GPU-powered for fast performance.',
                    params: [
                        {
                            id: 'gamma',
                            name: 'Gamma',
                            desc: 'Gamma (brightness) adjustment (0.1-3.0). Controls brightness correction. Values < 1 brighten, values > 1 darken. Only applied in preview mode. Default is 1.0 (regular/no adjustment). Range: 0.1-3.0.',
                            image: 'images/params/gamma.svg'
                        },
                        {
                            id: 'saturation',
                            name: 'Saturation',
                            desc: 'Saturation adjustment (0-2). Controls color intensity. 0 = grayscale, 1 = normal, > 1 = more saturated. Default is 1.0 (normal saturation). Range: 0-2.',
                            image: 'images/params/saturation.svg'
                        },
                        {
                            id: 'hue',
                            name: 'Hue',
                            desc: 'Hue shift in degrees (-180 to 180). Rotates colors around the color wheel. 0 = no shift, positive = shift towards red, negative = shift towards cyan. Default is 0 (no shift). Range: -180 to 180.',
                            image: 'images/params/hue.svg'
                        },
                        {
                            id: 'emission-strength',
                            name: 'Emission',
                            desc: 'Emission strength (0-2). Controls the intensity of emissive surfaces. 0 = no emission, 1 = normal, >1 = brighter. Default is 0. Range: 0-2.',
                            image: 'images/params/emission-strength.svg'
                        },
                        {
                            id: 'translucency-strength',
                            name: 'Translucency Strength',
                            desc: 'Translucency strength (0-32). Controls the intensity of the translucency effect during rendering. Higher values = more pronounced translucency. Translucency is captured separately from albedo and remains independent. Default is 0. Range: 0-32.',
                            image: 'images/params/translucency.svg'
                        },
                        {
                            id: 'invert-thickness',
                            name: 'Invert Thickness',
                            desc: 'Invert thickness map. When enabled, inverts the thickness calculation so thin areas (edges) become thick and thick areas (center) become thin. Useful for certain material types.',
                            image: 'images/params/invert-thickness.svg'
                        },
                        {
                            id: 'sharpen-strength',
                            name: 'Sharpen Strength',
                            desc: 'Post-sharpen strength (0-10). Sharpens the captured textures to enhance detail. Higher values = more sharpening. 0 = disabled. Default is 0. Range: 0-10.',
                            image: 'images/params/sharpen.svg'
                        },
                        {
                            id: 'denoise-strength',
                            name: 'Denoise Strength',
                            desc: 'Post-denoise strength (0-1). Reduces noise in captured textures using AI-powered real-time denoising. Higher values = more smoothing. 0 = disabled. Default is 0. Range: 0-1.',
                            image: 'images/params/denoise.svg'
                        },
                        {
                            id: 'denoise-passes',
                            name: 'Denoise Passes',
                            desc: 'Denoise passes (1-32). Number of times to apply the denoise filter. More passes = stronger smoothing. Default is 1. Range: 1-32.',
                            image: 'images/params/denoise-passes.svg'
                        }
                    ]
                }
            ]
        },
        {
            id: 'billboard',
            name: 'Billboard',
            icon: '../Packages/com.voidoverzero.rawteousimpostors/UI/icons/square.png',
            description: 'Billboard rendering mode, blending, and render state settings.',
            groups: [
                {
                    id: 'billboard-settings',
                    name: 'Billboard Settings',
                    description: 'Rendering settings for the billboard impostor.',
                    params: [
                        {
                            id: 'impostor-mode',
                            name: 'Impostor Mode',
                            desc: 'Impostor rendering mode. TextureBased = standard texture-based impostor, SmoothBlending = smooth blending between tiles. Range: 0-1.',
                            image: 'images/params/impostor-mode.svg'
                        },
                        {
                            id: 'blending-mode',
                            name: 'Blending Mode',
                            desc: 'Blending quality mode: Linear = standard bilinear (fastest), Smoothstep = smoother curves, Barycentric = 3-tile weighting, Spherical = best for normals, CatmullRom = smooth interpolation, Bicubic = high quality, AIInterpolation = AI-powered blending. Range: 0-6.',
                            image: 'images/params/blending-mode.svg'
                        },
                        {
                            id: 'step-rotation',
                            name: 'Step Rotation',
                            desc: 'Step rotation: billboard snaps to face capture angle directions instead of smoothly facing camera. Creates retro sprite-like rotation effect.',
                            image: 'images/params/step-rotation.svg'
                        },
                        {
                            id: 'billboard-type',
                            name: 'Billboard Type',
                            desc: 'Billboard rotation type: Cylindrical = Y-axis locked (trees), Spherical = full 3D facing (bushes), Screen-aligned = camera-aligned, no edge rotation (rocks). Range: 0-2.',
                            image: 'images/params/billboard-type.svg'
                        },
                        {
                            id: 'unfiltered-pixels',
                            name: 'Unfiltered Pixels',
                            desc: 'Unfiltered pixels: use point filtering instead of bilinear filtering for crisp pixel-perfect rendering.',
                            image: 'images/params/unfiltered-pixels.svg'
                        },
                        {
                            id: 'alpha-test',
                            name: 'Alpha Test',
                            desc: 'Enable alpha test (hard cutout/clipping) for billboard. Pixels with alpha below threshold are discarded.',
                            image: 'images/params/alpha-test.svg'
                        },
                        {
                            id: 'alpha-threshold',
                            name: 'Alpha Threshold',
                            desc: 'Alpha threshold for alpha test (0-1). Pixels with alpha below this value are discarded. Default is 0.5. Range: 0.0-1.0.',
                            image: 'images/params/alpha-threshold.svg'
                        },
                        {
                            id: 'show-gizmos',
                            name: 'Show Gizmos',
                            desc: 'Show gizmos in scene view. Display camera gizmos showing capture positions and angles. Useful for visualizing how the impostor is captured.',
                            image: 'images/params/debug-view.svg'
                        }
                    ]
                }
            ]
        },
        {
            id: 'cast',
            name: 'Cast',
            icon: '../Packages/com.voidoverzero.rawteousimpostors/UI/icons/vector-square.png',
            description: 'Cast mesh generation settings for shadow casting.',
            groups: [
                {
                    id: 'shape',
                    name: 'Shape',
                    description: 'Configure cast mesh generation for shadow casting.',
                    params: [
                        {
                            id: 'cast-enabled',
                            name: 'Cast Enabled',
                            desc: 'Enable cast mesh generation. When enabled, generates simplified meshes for shadow casting.',
                            image: 'images/params/cast-enabled.svg'
                        },
                        {
                            id: 'cast-threshold',
                            name: 'Cast Threshold',
                            desc: 'Cast threshold parameter for silhouette detection. Controls how the cast mesh is generated from the object silhouette. Range: 0.01-1.',
                            image: 'images/params/cast-threshold.svg'
                        },
                        {
                            id: 'cast-dilation',
                            name: 'Cast Dilation',
                            desc: 'Cast dilation parameter. Expands the cast mesh outward. Range: 0-100.',
                            image: 'images/params/cast-dilation.svg'
                        },
                    ]
                }
            ]
        },
        {
            id: 'channel-packing',
            name: 'Channels',
            icon: '../Packages/com.voidoverzero.rawteousimpostors/UI/icons/square.png',
            description: 'Channel packing configuration for PBR maps.',
            groups: [
                {
                    id: 'pbrmap',
                    name: 'PBRMap',
                    description: 'Configure which channels are packed into the PBR map texture.',
                    params: [
                        {
                            id: 'map-cr-channel',
                            name: 'R Channel',
                            desc: 'R channel source for Map C (PBRMap). Options include: None, Metallic, Smoothness, AO, Depth, EmissionR, EmissionG, EmissionB, Translucency, AlbedoR, AlbedoG, AlbedoB, Alpha, NormalR, NormalG, NormalB, Texcoord0R, Texcoord0G, Texcoord0B, VertexColorR, VertexColorG, VertexColorB, VertexColorA.',
                            image: 'images/params/channel-packing.svg'
                        },
                        {
                            id: 'map-cg-channel',
                            name: 'G Channel',
                            desc: 'G channel source for Map C (PBRMap). Options include: None, Metallic, Smoothness, AO, Depth, EmissionR, EmissionG, EmissionB, Translucency, AlbedoR, AlbedoG, AlbedoB, Alpha, NormalR, NormalG, NormalB, Texcoord0R, Texcoord0G, Texcoord0B, VertexColorR, VertexColorG, VertexColorB, VertexColorA.',
                            image: 'images/params/channel-packing.svg'
                        },
                        {
                            id: 'map-cb-channel',
                            name: 'B Channel',
                            desc: 'B channel source for Map C (PBRMap). Options include: None, Metallic, Smoothness, AO, Depth, EmissionR, EmissionG, EmissionB, Translucency, AlbedoR, AlbedoG, AlbedoB, Alpha, NormalR, NormalG, NormalB, Texcoord0R, Texcoord0G, Texcoord0B, VertexColorR, VertexColorG, VertexColorB, VertexColorA.',
                            image: 'images/params/channel-packing.svg'
                        },
                        {
                            id: 'map-ca-channel',
                            name: 'A Channel',
                            desc: 'A channel source for Map C (PBRMap). Options include: None, Metallic, Smoothness, AO, Depth, EmissionR, EmissionG, EmissionB, Translucency, AlbedoR, AlbedoG, AlbedoB, Alpha, NormalR, NormalG, NormalB, Texcoord0R, Texcoord0G, Texcoord0B, VertexColorR, VertexColorG, VertexColorB, VertexColorA.',
                            image: 'images/params/channel-packing.svg'
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
