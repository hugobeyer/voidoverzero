/**
 * Rawteous Documentation Data
 * Inspector Fields Documentation
 * Updated: January 2025
 */

const DOCS_DATA = {
    panels: [
        {
            id: 'settings',
            name: 'Settings',
            icon: '../Packages/com.voidoverzero.rawteousimpostors/UI/icons/square.png',
            description: 'Main configuration object containing all impostor generation settings.',
            groups: [
                {
                    id: 'settings-main',
                    name: 'Settings',
                    description: 'This is the main configuration object that contains all impostor generation settings. It controls how the impostor is captured, rendered, and displayed. You can expand this section to access all the detailed options below. Think of it as the container that holds all your impostor preferences in one place.',
                    params: [
                        {
                            id: 'settings',
                            name: 'Settings',
                            desc: 'This is the main configuration object that contains all impostor generation settings. It controls how the impostor is captured, rendered, and displayed. You can expand this section to access all the detailed options below. Think of it as the container that holds all your impostor preferences in one place.'
                        }
                    ]
                }
            ]
        },
        {
            id: 'leader',
            name: 'Leader',
            icon: '../Packages/com.voidoverzero.rawteousimpostors/UI/icons/square.png',
            description: 'Leader-follower system for sharing settings across multiple impostors.',
            groups: [
                {
                    id: 'leader-main',
                    name: 'Leader',
                    description: 'Assign another Rawteous GameObject here to make this object follow its settings automatically.',
                    params: [
                        {
                            id: 'leader',
                            name: 'Leader',
                            desc: 'Assign another Rawteous GameObject here to make this object follow its settings automatically. When set, this object will copy all settings from the leader and the UI will be locked to prevent changes. This is useful when you have multiple impostors that should share the same configuration. Leave it empty if you want to configure this object independently.'
                        }
                    ]
                }
            ]
        },
        {
            id: 'source-object',
            name: 'Source Object',
            icon: '../Packages/com.voidoverzero.rawteousimpostors/UI/icons/square.png',
            description: 'The GameObject to convert into an impostor.',
            groups: [
                {
                    id: 'source-object-main',
                    name: 'Source Object',
                    description: 'Drop any GameObject here that you want to convert into an impostor.',
                    params: [
                        {
                            id: 'source-object',
                            name: 'Source Object',
                            desc: 'Drop any GameObject here that you want to convert into an impostor. This can be a scene object or a prefab asset. The system will capture this object from multiple angles and create a billboard texture that represents it. Make sure the object has mesh renderers or skinned mesh renderers so it can be captured properly.'
                        }
                    ]
                }
            ]
        },
        {
            id: 'impostor',
            name: 'Impostor Settings',
            icon: '../Packages/com.voidoverzero.rawteousimpostors/UI/icons/square.png',
            description: 'Core impostor generation settings including mode, blending, and capture configuration.',
            groups: [
                {
                    id: 'impostor-settings',
                    name: 'Impostor Settings',
                    description: 'Control how the impostor blends between viewing angles and capture settings.',
                    params: [
                        {
                            id: 'impostor-mode',
                            name: 'Impostor Mode',
                            desc: 'Choose how the impostor blends between different viewing angles. TextureBased mode uses standard texture-based impostors with discrete angle switching. SmoothBlending mode smoothly blends between tiles for more natural transitions. Use TextureBased for performance, SmoothBlending for quality.'
                        },
                        {
                            id: 'smooth-blending',
                            name: 'Smooth Blending',
                            desc: 'This toggle controls smooth blending between impostor tiles. When enabled, it switches to SmoothBlending mode automatically. When disabled, it uses TextureBased mode. This setting is synced with Impostor Mode, so changing one updates the other.'
                        },
                        {
                            id: 'blending-mode',
                            name: 'Blending Mode',
                            desc: 'Controls the quality of blending between impostor tiles. Linear is the fastest option using standard bilinear filtering. Smoothstep provides smoother curves for better visual quality. Barycentric uses 3-tile weighting for more accurate blending. CatmullRom offers the smoothest transitions but is slower.'
                        },
                        {
                            id: 'billboard-type',
                            name: 'Billboard Type',
                            desc: 'Determines how the billboard rotates to face the camera. Cylindrical locks rotation to the Y-axis only, perfect for trees and vertical objects. Spherical allows full 3D rotation, ideal for bushes and round objects. ScreenAligned keeps the billboard aligned to the screen with no edge rotation, best for rocks and static objects.'
                        },
                        {
                            id: 'unfiltered-pixels',
                            name: 'Unfiltered Pixels',
                            desc: 'When enabled, uses point filtering instead of bilinear filtering for pixel-perfect rendering. This gives you crisp, sharp edges without any blurring between pixels. Useful for low-resolution pixel art style or when you want maximum sharpness. Disable for smoother, more natural textures.'
                        },
                        {
                            id: 'capture-angles',
                            name: 'Capture Angles',
                            desc: 'Sets how many horizontal angles around the object will be captured. Valid values are 4, 6, 8, 12, 16, 20, 24, 32, 48, 64, 80, 96, and 128. Higher values give smoother rotation transitions but increase capture time and texture size. Lower values are faster but may show visible angle switching.'
                        },
                        {
                            id: 'capture-elevations',
                            name: 'Capture Elevations',
                            desc: 'Controls how many vertical angles from top to bottom will be captured. Valid values range from 1 (lowest quality) to 33 (extreme quality). Common values are 3 for low quality, 5 for average, 9 for medium, 11 for high, 15 for very high, and 17 for ultra quality. More elevations improve vertical viewing angles but increase capture time.'
                        },
                        {
                            id: 'texture-resolution',
                            name: 'Texture Resolution',
                            desc: 'The resolution of each captured texture tile. Must be a power of 2: 8, 16, 32, 64, 128, 256, 512, or 1024. Higher resolution gives better detail but uses more memory and takes longer to capture. Lower resolution is faster and uses less memory but may look blurry up close.'
                        },
                        {
                            id: 'auto-resolution',
                            name: 'Auto Resolution',
                            desc: 'When enabled, automatically calculates the texture resolution based on the object\'s bounding box size. The system analyzes how large your object is and picks an appropriate resolution. This is useful when working with objects of varying sizes, as each gets an optimal resolution. The calculated resolution is clamped to the maximum auto resolution setting.'
                        },
                        {
                            id: 'max-auto-resolution',
                            name: 'Max Auto Resolution',
                            desc: 'Sets the upper limit for automatically calculated resolutions. When auto resolution is enabled, the system will never exceed this value. This prevents extremely large objects from generating massive textures that could cause performance issues. Set this based on your target platform\'s memory constraints.'
                        },
                        {
                            id: 'auto-resolution-use-world-size',
                            name: 'Auto Resolution Use World Size',
                            desc: 'When enabled, calculates resolution using the object\'s actual world-space size instead of its prefab default size. This is useful when the same prefab appears at different scales in your scene. Each instance gets a resolution appropriate for its actual size, ensuring consistent quality across different scales.'
                        }
                    ]
                }
            ]
        },
        {
            id: 'capture',
            name: 'Capture Settings',
            icon: '../Packages/com.voidoverzero.rawteousimpostors/UI/icons/camera.png',
            description: 'Capture distribution and quality settings for impostor generation.',
            groups: [
                {
                    id: 'capture-settings',
                    name: 'Capture Settings',
                    description: 'Configure how capture angles are distributed and quality settings.',
                    params: [
                        {
                            id: 'capture-distribution',
                            name: 'Capture Distribution',
                            desc: 'Chooses how capture angles are distributed around the object. Grid uses a standard azimuth and elevation grid pattern. Fibonacci distributes points uniformly across a sphere using Fibonacci spiral mathematics. Octahedron uses continuous octahedron mapping for even coverage. HemiOctahedron focuses on the top hemisphere only.'
                        },
                        {
                            id: 'hemisphere-only',
                            name: 'Hemisphere Only',
                            desc: 'When enabled, only captures views from above the horizon (0-90 degrees elevation). This is useful for objects that are never viewed from below, like trees or buildings. It reduces capture time and texture size by skipping bottom views. Disable if your object needs to be viewed from underneath.'
                        },
                        {
                            id: 'fibonacci-points',
                            name: 'Fibonacci Points',
                            desc: 'The number of capture points when using Fibonacci distribution. Common values are 16, 32, 64, 128, and 256. Higher values provide more uniform coverage but increase capture time. Fibonacci distribution is often better than grid for spherical objects as it avoids clustering at the poles.'
                        },
                        {
                            id: 'octahedron-resolution',
                            name: 'Octahedron Resolution',
                            desc: 'The grid size for octahedron capture distribution. For example, 8 creates an 8x8 grid with 64 total samples, while 16 creates 16x16 with 256 samples. Higher resolution gives better quality but requires more captures. This setting only applies when using Octahedron or HemiOctahedron distribution modes.'
                        },
                        {
                            id: 'pole-scaling',
                            name: 'Pole Scaling',
                            desc: 'Scales the elevation range up or down the sphere. Lower values compress the range, giving less coverage but focusing on the equator. Higher values expand the range, providing more coverage towards the poles. A value of 50 means no scaling. Adjust this to prioritize certain viewing angles.'
                        },
                        {
                            id: 'horizontal-arch-limit',
                            name: 'Horizontal Arch Limit',
                            desc: 'Limits the azimuth range in degrees, focusing captures on the front view. A value of 360 captures the full 360-degree range. Lower values like 180 or 90 limit captures to specific angles, prioritizing front-facing views. This reduces capture time and texture size when you don\'t need full rotation.'
                        },
                        {
                            id: 'super-sampling-multiplier',
                            name: 'Super Sampling Multiplier',
                            desc: 'Renders at a higher resolution then downscales for better quality. 0 disables super-sampling (1x resolution). Values of 1, 2, 3, or 4 render at 1.5x, 2x, 3x, or 4x resolution respectively. Higher values give better quality but significantly increase capture time. Use for final production captures.'
                        },
                        {
                            id: 'downscaling-filter',
                            name: 'Downscaling Filter',
                            desc: 'The method used when super-sampling is enabled. Bilinear is the fastest option but may introduce some blur. Lanczos provides the best quality with smooth downscaling. CatmullRom creates sharper results but may introduce ringing artifacts. Choose based on your quality vs speed needs.'
                        }
                    ]
                }
            ]
        },
        {
            id: 'postprocess',
            name: 'Post Processing',
            icon: '../Packages/com.voidoverzero.rawteousimpostors/UI/icons/tv-minimal-play.png',
            description: 'Post-processing effects for texture quality adjustment.',
            groups: [
                {
                    id: 'post-processing',
                    name: 'Post Processing',
                    description: 'Adjust brightness, color, and visual appearance of captured textures.',
                    params: [
                        {
                            id: 'gamma',
                            name: 'Gamma',
                            desc: 'Adjusts the brightness of the captured impostor texture. Values below 1.0 brighten the image, while values above 1.0 darken it. The default is 1.0 which means no adjustment. This only affects preview mode, not the final captured texture. Use this to compensate for monitor gamma differences.'
                        },
                        {
                            id: 'saturation',
                            name: 'Saturation',
                            desc: 'Controls the intensity of colors in the impostor. A value of 0 makes everything grayscale. A value of 1.0 is normal saturation. Values above 1.0 increase color intensity, making colors more vibrant. The default is 1.0 for normal color appearance. Adjust to match your scene\'s color grading.'
                        },
                        {
                            id: 'hue',
                            name: 'Hue',
                            desc: 'Shifts all colors around the color wheel in degrees. A value of 0 means no shift. Positive values shift colors towards red, negative values shift towards cyan. This can be used for color correction or artistic effects. The default is 0 for no color shift. Only affects preview mode.'
                        }
                    ]
                }
            ]
        },
        {
            id: 'pbr',
            name: 'PBR Settings',
            icon: '../Packages/com.voidoverzero.rawteousimpostors/UI/icons/square.png',
            description: 'Physically Based Rendering settings for material capture.',
            groups: [
                {
                    id: 'pbr-settings',
                    name: 'PBR Settings',
                    description: 'Configure capture bounds, material properties, and PBR map settings.',
                    params: [
                        {
                            id: 'capture-frame-reduction',
                            name: 'Capture Frame Reduction',
                            desc: 'Expands the billboard mesh vertices outward to add padding around the captured content. Higher values add more padding, ensuring nothing gets cut off at the edges. The capture frame itself stays intact. The default is 0.25 (25% expansion). Increase if you see clipping at edges.'
                        },
                        {
                            id: 'edit-bounds',
                            name: 'Edit Bounds',
                            desc: 'When enabled, shows transform handles and a radius dragger in the scene view to manually adjust capture bounds. You can move the center point and resize the radius sphere. Custom bounds will be used for capture instead of automatic bounds calculation. Useful for fine-tuning what gets captured.'
                        },
                        {
                            id: 'custom-bounds-center',
                            name: 'Custom Bounds Center',
                            desc: 'The center position of the custom bounds sphere in world space. Only used when Edit Bounds is enabled. You can adjust this in the scene view using the transform handles. This lets you precisely control what area of your object gets captured in the impostor.'
                        },
                        {
                            id: 'custom-bounds-radius',
                            name: 'Custom Bounds Radius',
                            desc: 'The radius of the custom bounds sphere. Only used when Edit Bounds is enabled. Larger radius captures more of the scene around your object. Smaller radius focuses tightly on the object itself. Adjust this in the scene view using the radius dragger gizmo.'
                        },
                        {
                            id: 'emission-strength',
                            name: 'Emission Strength',
                            desc: 'Controls how bright emissive surfaces appear in the impostor. A value of 0 means no emission. A value of 1.0 is normal emission intensity. Values above 1.0 make emissive areas brighter. The default is 0. Use this to make glowing objects stand out more or less in your impostor.'
                        },
                        {
                            id: 'translucency-strength',
                            name: 'Translucency Strength',
                            desc: 'Controls the intensity of the translucency effect during rendering. Higher values make the translucency more pronounced, allowing more light to pass through. Translucency is captured separately from albedo and remains independent. The default is 0. Increase for materials like leaves or fabric.'
                        },
                        {
                            id: 'occlusion-strength',
                            name: 'Occlusion Strength',
                            desc: 'Controls how much ambient occlusion darkens the impostor. A value of 0 means no occlusion effect. A value of 1.0 applies full occlusion from the texture. This reduces darkness from ambient occlusion. Use this to fine-tune how shadows and occlusion appear in your impostor.'
                        },
                        {
                            id: 'invert-thickness',
                            name: 'Invert Thickness',
                            desc: 'When enabled, inverts the thickness calculation so thin areas become thick and thick areas become thin. This is useful for certain material types where the standard thickness calculation doesn\'t work well. Typically used for special effects or non-standard materials.'
                        }
                    ]
                }
            ]
        },
        {
            id: 'parallax',
            name: 'Parallax',
            icon: '../Packages/com.voidoverzero.rawteousimpostors/UI/icons/square.png',
            description: 'Parallax mapping settings for depth illusion.',
            groups: [
                {
                    id: 'parallax-settings',
                    name: 'Parallax',
                    description: 'Configure parallax mapping for enhanced depth perception.',
                    params: [
                        {
                            id: 'use-parallax',
                            name: 'Use Parallax',
                            desc: 'Enables parallax mapping using the depth atlas. When enabled, the impostor uses depth information to create a parallax effect that gives the illusion of depth. This makes flat billboards appear more three-dimensional. Disable for better performance if you don\'t need the depth effect.'
                        },
                        {
                            id: 'parallax-scale',
                            name: 'Parallax Scale',
                            desc: 'Controls how much depth effect is applied. Higher values increase the perceived depth from the depth atlas, making the parallax effect more pronounced. Lower values create a subtler effect. Adjust this to match your object\'s actual depth characteristics.'
                        },
                        {
                            id: 'parallax-max-steps',
                            name: 'Parallax Max Steps',
                            desc: 'The maximum number of raymarching steps used for parallax calculations. Higher values provide more accurate parallax but are slower to render. Lower values are faster but may miss some depth details. The default is 32, which provides a good balance between quality and performance.'
                        },
                        {
                            id: 'parallax-mid-plane',
                            name: 'Parallax Mid Plane',
                            desc: 'Sets the reference depth plane for parallax calculations. A value of 0.5 centers the parallax plane in the depth atlas. Adjusting this shifts where the parallax effect is centered. This can help align the parallax effect with your object\'s actual geometry.'
                        },
                        {
                            id: 'intersection-tolerance',
                            name: 'Intersection Tolerance',
                            desc: 'Controls how much self-intersection is allowed when parallax depth matches the surface. Lower values reduce self-intersection artifacts but may cause some depth details to be missed. Higher values allow more intersection but may cause visual artifacts. The default is 0.01.'
                        }
                    ]
                }
            ]
        },
        {
            id: 'billboard',
            name: 'Billboard Settings',
            icon: '../Packages/com.voidoverzero.rawteousimpostors/UI/icons/square.png',
            description: 'Billboard rendering and alpha settings.',
            groups: [
                {
                    id: 'billboard-settings',
                    name: 'Billboard Settings',
                    description: 'Configure billboard rendering, alpha testing, and positioning.',
                    params: [
                        {
                            id: 'alpha-test',
                            name: 'Alpha Test',
                            desc: 'Enables hard cutout clipping based on alpha values. When enabled, pixels with alpha below the threshold are completely discarded. This creates sharp edges without blending. Useful for objects with clear boundaries like leaves or chain-link fences. Disable for smooth transparency.'
                        },
                        {
                            id: 'alpha-threshold',
                            name: 'Alpha Threshold',
                            desc: 'The alpha value threshold for alpha test. Pixels with alpha below this value are discarded completely. A value of 0.5 means pixels below 50% opacity are cut out. Adjust this to control how much of the impostor is visible. Lower values show more, higher values show less.'
                        },
                        {
                            id: 'billboard-z-offset',
                            name: 'Billboard Z Offset',
                            desc: 'Moves the billboard forward or backward along its local Z axis. Positive values move it forward (towards camera), negative values move it backward. This can help fix depth sorting issues or position the billboard correctly relative to other objects. Measured in world units.'
                        }
                    ]
                }
            ]
        },
        {
            id: 'lod',
            name: 'LOD Settings',
            icon: '../Packages/com.voidoverzero.rawteousimpostors/UI/icons/square.png',
            description: 'Level of detail and LOD Group integration.',
            groups: [
                {
                    id: 'lod-settings',
                    name: 'LOD Settings',
                    description: 'Automatically integrate impostors into Unity\'s LOD system.',
                    params: [
                        {
                            id: 'join-lod-group',
                            name: 'Join LOD Group',
                            desc: 'When enabled, automatically adds the impostor to the source object\'s LOD Group as the furthest LOD level. The impostor will appear when the object reaches the configured LOD percentage threshold. This integrates impostors seamlessly into Unity\'s LOD system for automatic quality management.'
                        },
                        {
                            id: 'lod-percentage',
                            name: 'LOD Percentage',
                            desc: 'The screen height threshold for when the impostor LOD level activates. Lower values mean the impostor appears when objects are further away. Higher values mean it appears closer. The default is 0.05 (5% screen height). Adjust based on when you want the impostor to replace the full geometry.'
                        }
                    ]
                }
            ]
        },
        {
            id: 'wind',
            name: 'Wind Effects',
            icon: '../Packages/com.voidoverzero.rawteousimpostors/UI/icons/square.png',
            description: 'Wind animation settings for billboard movement.',
            groups: [
                {
                    id: 'wind-effects',
                    name: 'Wind Effects',
                    description: 'Configure wind animation for natural movement effects.',
                    params: [
                        {
                            id: 'enable-wind',
                            name: 'Enable Wind',
                            desc: 'Turns on wind animation effects for the billboard. When enabled, the impostor will sway and animate based on wind settings. This is useful for trees, grass, flags, and other objects that should respond to wind. Disable for static objects to save performance.'
                        },
                        {
                            id: 'wind-speed',
                            name: 'Wind Speed',
                            desc: 'The overall speed multiplier for wind animation. Higher values make wind effects happen faster. Lower values create slower, more gentle movement. This affects all wind animations uniformly. Adjust to match your scene\'s wind conditions or artistic style.'
                        },
                        {
                            id: 'wind-rate',
                            name: 'Wind Rate',
                            desc: 'Controls how often wind gusts and changes occur. Higher values create more frequent wind changes, making the animation more dynamic. Lower values create steadier, more predictable wind patterns. This adds variation to the wind animation over time.'
                        },
                        {
                            id: 'wind-strength',
                            name: 'Wind Strength',
                            desc: 'The intensity multiplier for wind effects. Higher values create stronger wind that moves objects more. Lower values create gentle breezes with subtle movement. This controls the amplitude of wind animations. Adjust to match the desired wind intensity.'
                        },
                        {
                            id: 'grass-weight',
                            name: 'Grass Weight',
                            desc: 'Controls how much grass-like wind behavior is applied. Grass wind is quick and frequent, with rapid swaying motion. Set this higher for objects that should move like grass. Combine with other weights to create mixed wind behaviors. Range is 0 to 1.'
                        },
                        {
                            id: 'bush-weight',
                            name: 'Bush Weight',
                            desc: 'Controls how much bush-like wind behavior is applied. Bush wind has medium speed and moderate swaying. Set this higher for objects that should move like bushes or shrubs. Works together with grass and tree weights for combined effects. Range is 0 to 1.'
                        },
                        {
                            id: 'tree-weight',
                            name: 'Tree Weight',
                            desc: 'Controls how much tree-like wind behavior is applied. Tree wind is slow and heavy, with large sweeping motions. Set this higher for objects that should move like trees with trunks. This is the default weight setting. Range is 0 to 1.'
                        },
                        {
                            id: 'wind-direction',
                            name: 'Wind Direction',
                            desc: 'The direction of wind in world space. This should be a normalized vector pointing in the direction wind is blowing. For example, (1, 0, 0.3) means wind blowing mostly in the positive X direction with slight upward component. Adjust to match your scene\'s wind setup.'
                        },
                        {
                            id: 'random-phase',
                            name: 'Random Phase',
                            desc: 'When enabled, applies a random phase offset to wind animation for each instance. This prevents all instances from animating in perfect sync, creating more natural variation. Disable if you want synchronized wind animation across all instances. Typically enabled for natural-looking scenes.'
                        }
                    ]
                }
            ]
        },
        {
            id: 'debug',
            name: 'Debug',
            icon: '../Packages/com.voidoverzero.rawteousimpostors/UI/icons/square.png',
            description: 'Debug visualization and gizmo settings.',
            groups: [
                {
                    id: 'debug-settings',
                    name: 'Debug',
                    description: 'Visual debugging tools for impostor setup.',
                    params: [
                        {
                            id: 'show-gizmos',
                            name: 'Show Gizmos',
                            desc: 'When enabled, displays visual gizmos in the scene view showing capture positions, bounds, and other debug information. This helps you visualize how the impostor system is working. Disable to clean up the scene view if gizmos are cluttering your view. Useful for debugging and setup.'
                        }
                    ]
                }
            ]
        },
        {
            id: 'lod-generator',
            name: 'LOD Generator',
            icon: '../Packages/com.voidoverzero.rawteousimpostors/UI/icons/square.png',
            description: 'Decimator LOD mesh generation settings.',
            groups: [
                {
                    id: 'lod-generator',
                    name: 'LOD Generator',
                    description: 'Automatically generate simplified LOD meshes from the impostor billboard.',
                    params: [
                        {
                            id: 'show-preview',
                            name: 'Show Preview',
                            desc: 'When enabled, displays visual previews of the generated LOD meshes in the scene view next to your model. These previews show how the mesh will look at different LOD levels before you bake them. Disable to hide the previews and reduce scene clutter. The LOD meshes are still generated for baking even when preview is disabled.'
                        },
                        {
                            id: 'lod-count',
                            name: 'LOD Count',
                            desc: 'Sets how many LOD levels will be generated. Each LOD level is progressively more simplified than the previous one. Higher values create more gradual transitions between quality levels but take longer to generate. Lower values are faster but may have more noticeable quality jumps. The default is 3 levels, which provides a good balance.'
                        },
                        {
                            id: 'reduction-percent',
                            name: 'Reduction %',
                            desc: 'Controls how much geometry is removed at each LOD step. This is a percentage value between 0.1 and 0.95. Lower values keep more detail at each step, creating higher quality LODs. Higher values remove more geometry, creating lower quality but smaller meshes. Adjust based on your performance and quality needs.'
                        },
                        {
                            id: 'lod-spacing',
                            name: 'LOD Spacing',
                            desc: 'Controls the visual spacing between LOD preview objects in the scene view. This only affects how the previews are displayed, not the actual LOD generation. Higher values spread the previews further apart for easier viewing. Lower values keep them closer together. Adjust this to make the previews easier to compare visually.'
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
