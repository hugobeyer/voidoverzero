// 3D Viewer Integration for Rawteous Documentation
// Usage: Add data-3d-scene="sceneName" to any <img> tag
// Example: <img src="..." data-3d-scene="resolution">

import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.160.0/examples/jsm/controls/OrbitControls.js';

const C = {
    bg: 0x1a1e24,
    teal: 0x00ffd5,
    gold: 0xb9975b,
    red: 0xd64550,
    grey: 0x888888,
    white: 0xffffff,
    treeTrunk: 0x5d4d9b,
    treeLeaves: 0x00b894
};

class Rawteous3DViewer {
    constructor() {
        this.active = false;
        this.initDOM();
        this.bindImages();
    }

    initDOM() {
        // Create Modal Elements
        this.overlay = document.createElement('div');
        Object.assign(this.overlay.style, {
            position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
            backgroundColor: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(8px)',
            zIndex: '9999',
            display: 'none',
            opacity: '0',
            transition: 'opacity 0.3s ease'
        });

        this.window = document.createElement('div');
        Object.assign(this.window.style, {
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%) scale(0.9)',
            width: '60vw', height: '60vh',
            minWidth: '600px', minHeight: '400px',
            backgroundColor: '#1a1e24',
            border: '1px solid #3e434c',
            borderRadius: '8px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            overflow: 'hidden',
            transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.27)'
        });

        this.closeBtn = document.createElement('button');
        this.closeBtn.innerHTML = '×';
        Object.assign(this.closeBtn.style, {
            position: 'absolute', top: '10px', right: '10px',
            background: 'none', border: 'none', color: '#fff',
            fontSize: '24px', cursor: 'pointer', zIndex: '10',
            opacity: '0.7'
        });
        this.closeBtn.onmouseover = () => this.closeBtn.style.opacity = '1';
        this.closeBtn.onmouseout = () => this.closeBtn.style.opacity = '0.7';

        this.canvasContainer = document.createElement('div');
        Object.assign(this.canvasContainer.style, { width: '100%', height: '100%' });

        this.labelContainer = document.createElement('div');
        Object.assign(this.labelContainer.style, {
            position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', pointerEvents: 'none'
        });

        this.window.appendChild(this.closeBtn);
        this.window.appendChild(this.canvasContainer);
        this.window.appendChild(this.labelContainer);
        this.overlay.appendChild(this.window);
        document.body.appendChild(this.overlay);

        // Event Listeners
        this.closeBtn.onclick = () => this.close();
        this.overlay.onclick = (e) => {
            if(e.target === this.overlay) this.close();
        };
        window.addEventListener('keydown', (e) => {
            if(e.key === 'Escape') this.close();
        });
        window.addEventListener('resize', () => {
            if(this.active) this.onResize();
        });
    }

    bindImages() {
        const images = document.querySelectorAll('img[data-3d-scene]');
        images.forEach(img => {
            img.style.cursor = 'pointer';
            img.title = "Click to view in 3D";
            img.addEventListener('click', () => {
                this.open(img.dataset.3dScene);
            });

            // Add visual cue
            const wrapper = document.createElement('div');
            wrapper.style.position = 'relative';
            wrapper.style.display = 'inline-block';
            img.parentNode.insertBefore(wrapper, img);
            wrapper.appendChild(img);

            const badge = document.createElement('div');
            badge.innerText = '3D';
            Object.assign(badge.style, {
                position: 'absolute', bottom: '10px', right: '10px',
                background: 'rgba(0, 255, 213, 0.9)', color: '#1a1e24',
                padding: '4px 8px', borderRadius: '4px',
                fontWeight: 'bold', fontSize: '12px',
                pointerEvents: 'none', boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
            });
            wrapper.appendChild(badge);
        });
    }

    open(sceneName) {
        this.active = true;
        this.overlay.style.display = 'block';
        // Force reflow
        this.overlay.offsetHeight;
        this.overlay.style.opacity = '1';
        this.window.style.transform = 'translate(-50%, -50%) scale(1)';

        this.initThree();
        this.loadScene(sceneName);
        this.animate();
    }

    close() {
        this.active = false;
        this.overlay.style.opacity = '0';
        this.window.style.transform = 'translate(-50%, -50%) scale(0.9)';

        setTimeout(() => {
            this.overlay.style.display = 'none';
            this.disposeThree();
        }, 300);
    }

    initThree() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(C.bg);

        const aspect = this.canvasContainer.clientWidth / this.canvasContainer.clientHeight;
        const d = 16;
        this.camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);
        this.camera.position.set(20, 20, -20);
        this.camera.lookAt(0, 0, 0);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(this.canvasContainer.clientWidth, this.canvasContainer.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.canvasContainer.appendChild(this.renderer.domElement);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.1;

        // Lights
        const amb = new THREE.AmbientLight(0xffffff, 0.6);
        const dir = new THREE.DirectionalLight(0xffffff, 0.8);
        dir.position.set(10, 20, 10);
        this.scene.add(amb, dir);

        this.content = new THREE.Group();
        this.scene.add(this.content);
        this.activeLabels = [];
    }

    disposeThree() {
        if(this.renderer) {
            this.renderer.dispose();
            this.canvasContainer.removeChild(this.renderer.domElement);
            this.renderer = null;
        }
        this.activeLabels = [];
        this.labelContainer.innerHTML = '';
    }

    onResize() {
        if(!this.camera || !this.renderer) return;
        const w = this.canvasContainer.clientWidth;
        const h = this.canvasContainer.clientHeight;
        const aspect = w / h;
        const d = 16;

        this.camera.left = -d * aspect;
        this.camera.right = d * aspect;
        this.camera.top = d;
        this.camera.bottom = -d;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h);
    }

    animate() {
        if(!this.active) return;
        requestAnimationFrame(() => this.animate());
        this.controls.update();
        this.updateLabels();
        this.renderer.render(this.scene, this.camera);
    }

    updateLabels() {
        const w = this.canvasContainer.clientWidth;
        const h = this.canvasContainer.clientHeight;

        this.activeLabels.forEach(lbl => {
            const pos = lbl.pos.clone();
            pos.project(this.camera);

            // NDC to pixel
            const x = (pos.x * .5 + .5) * w;
            const y = (-(pos.y * .5) + .5) * h;

            lbl.el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;

            // Simple depth check
            lbl.el.style.opacity = (Math.abs(pos.z) < 1) ? '1' : '0.2';
            lbl.el.style.zIndex = (1000 - Math.floor(pos.z * 100)).toString();
        });
    }

    addLabel(prop, val, position, colorClass) {
        const div = document.createElement('div');
        Object.assign(div.style, {
            position: 'absolute',
            fontFamily: "'Segoe UI', sans-serif",
            fontSize: '14px',
            color: '#e0e0e0',
            background: 'rgba(40, 44, 52, 0.9)',
            padding: '6px 12px',
            borderRadius: '4px',
            border: '1px solid #21252b',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
            display: 'flex', alignItems: 'center', gap: '8px',
            transition: 'opacity 0.1s'
        });

        let hex = C.teal;
        if(colorClass === 'gold') hex = C.gold;
        if(colorClass === 'red') hex = C.red;

        // Convert hex number to string
        const hexStr = '#' + hex.toString(16).padStart(6, '0');
        let valColor = '#00ffd5';
        if(colorClass === 'gold') valColor = '#b9975b';
        if(colorClass === 'red') valColor = '#d64550';

        div.innerHTML = `
            <div style="width:10px; height:10px; background:${hexStr}; border-radius:50%;"></div>
            <span style="color:#bdbdbd; font-weight:500;">${prop}:</span>
            <span style="color:${valColor}; font-weight:700;">${val}</span>
        `;

        this.labelContainer.appendChild(div);
        this.activeLabels.push({ el: div, pos: position });
    }

    // --- SCENE HELPERS (Copied & Adapted from Generator) ---

    createGradientMaterial(color) {
        return new THREE.ShaderMaterial({
            uniforms: { color: { value: new THREE.Color(color) } },
            vertexShader: `
                attribute float alpha;
                varying float vAlpha;
                void main() { vAlpha = alpha; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
            `,
            fragmentShader: `
                uniform vec3 color;
                varying float vAlpha;
                void main() { gl_FragColor = vec4(color, vAlpha); }
            `,
            transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
        });
    }

    createCameraGizmo(color, scale = 1.0) {
        const group = new THREE.Group();
        const w = 0.5 * scale, h = 0.35 * scale, z = 1.0 * scale;
        const vertices = [
            -w,-h,z, w,-h,z, w,-h,z, w,h,z, w,h,z, -w,h,z, -w,h,z, -w,-h,z,
            0,0,0, -w,-h,z, 0,0,0, w,-h,z, 0,0,0, w,h,z, 0,0,0, -w,h,z
        ];
        const alphas = [1,1,1,1,1,1,1,1, 0,1, 0,1, 0,1, 0,1];
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geo.setAttribute('alpha', new THREE.Float32BufferAttribute(alphas, 1));
        const mat = this.createGradientMaterial(color);
        group.add(new THREE.LineSegments(geo, mat));
        return group;
    }

    createGridSphere(radius, angles, elevations, color, limitArch, hemiOnly) {
        const group = new THREE.Group();
        for (let e = 0; e < elevations; e++) {
            const t = elevations > 1 ? e / (elevations - 1) : 0.5;
            let elevAng = hemiOnly ? t * (Math.PI / 2) : -Math.PI/2 + t * Math.PI;
            const halfArch = (limitArch * Math.PI / 180) / 2;
            for (let a = 0; a < angles; a++) {
                const tA = angles > 1 ? a / (angles - 1) : 0.5;
                let azAng = (limitArch >= 360) ? (a / angles) * Math.PI * 2 : -halfArch + tA * (limitArch * Math.PI / 180);
                const r = radius, y = r * Math.sin(elevAng), h = r * Math.cos(elevAng);
                const pos = new THREE.Vector3(h * Math.sin(azAng), y, h * Math.cos(azAng));
                const cam = this.createCameraGizmo(color, 0.8);
                cam.position.copy(pos); cam.lookAt(0, 0, 0);
                group.add(cam);
            }
        }
        return group;
    }

    // --- SCENE LOADING ---

    loadScene(name) {
        if(name === 'resolution') this.buildResolution();
        else if(name === 'horizontalArch') this.buildHorizontalArch();
        else if(name === 'hemisphere') this.buildHemisphere();
    }

    buildResolution() {
        const gap = 16;
        // 64px
        const g1 = new THREE.Group(); g1.position.x = -gap;
        const gr1 = new THREE.GridHelper(8, 4, C.red, 0x333333); gr1.position.y = -0.1; g1.add(gr1);
        const t1 = new THREE.Mesh(new THREE.BoxGeometry(2, 4, 2), new THREE.MeshStandardMaterial({ color: C.red, roughness: 0.8 })); t1.position.y = 2; g1.add(t1);
        this.content.add(g1);
        this.addLabel('textureResolution', '64', new THREE.Vector3(-gap, -3, 0), 'red');

        // 256px
        const g2 = new THREE.Group(); g2.position.x = 0;
        const gr2 = new THREE.GridHelper(8, 8, C.teal, 0x333333); gr2.position.y = -0.1; g2.add(gr2);
        const t2t = new THREE.Mesh(new THREE.BoxGeometry(1, 2, 1), new THREE.MeshStandardMaterial({ color: 0x444444 })); t2t.position.y = 1;
        const t2l = new THREE.Mesh(new THREE.ConeGeometry(2.5, 4, 8), new THREE.MeshStandardMaterial({ color: C.teal, flatShading: true })); t2l.position.y = 4; g2.add(t2t, t2l);
        this.content.add(g2);
        this.addLabel('textureResolution', '256', new THREE.Vector3(0, -3, 0), 'default');

        // 512px
        const g3 = new THREE.Group(); g3.position.x = gap;
        const gr3 = new THREE.GridHelper(8, 16, C.gold, 0x333333); gr3.position.y = -0.1; g3.add(gr3);
        const t3t = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.8, 2, 16), new THREE.MeshStandardMaterial({ color: 0x444444 })); t3t.position.y = 1;
        const t3l = new THREE.Mesh(new THREE.ConeGeometry(2.5, 5, 32), new THREE.MeshStandardMaterial({ color: C.gold, roughness: 0.2 })); t3l.position.y = 4.5; g3.add(t3t, t3l);
        this.content.add(g3);
        this.addLabel('textureResolution', '512', new THREE.Vector3(gap, -3, 0), 'gold');
    }

    buildHorizontalArch() {
        const center = new THREE.Mesh(new THREE.IcosahedronGeometry(1.5, 1), new THREE.MeshBasicMaterial({ color: 0x444444, wireframe: true }));
        this.content.add(center);

        // 360
        const g1 = new THREE.Group(); g1.position.x = -22;
        g1.add(this.createGridSphere(8, 8, 5, C.teal, 360, false));
        this.content.add(g1);
        this.addLabel('horizontalArchLimit', '360', new THREE.Vector3(-22, -12, 0), 'default');

        // 180
        const g2 = new THREE.Group(); g2.position.x = 0;
        g2.add(this.createGridSphere(8, 5, 5, C.gold, 180, false));
        const gh2 = new THREE.Mesh(new THREE.SphereGeometry(7.5, 16, 16, Math.PI, Math.PI), new THREE.MeshBasicMaterial({ color: 0x333333, wireframe: true, transparent: true, opacity: 0.2 })); gh2.rotation.y = -Math.PI/2; g2.add(gh2);
        this.content.add(g2);
        this.addLabel('horizontalArchLimit', '180', new THREE.Vector3(0, -12, 0), 'gold');

        // 90
        const g3 = new THREE.Group(); g3.position.x = 22;
        g3.add(this.createGridSphere(8, 3, 5, C.red, 90, false));
        const gh3 = new THREE.Mesh(new THREE.SphereGeometry(7.5, 16, 16, Math.PI * 0.75, Math.PI * 1.5), new THREE.MeshBasicMaterial({ color: 0x333333, wireframe: true, transparent: true, opacity: 0.2 })); gh3.rotation.y = -Math.PI/2; g3.add(gh3);
        this.content.add(g3);
        this.addLabel('horizontalArchLimit', '90', new THREE.Vector3(22, -12, 0), 'red');
    }

    buildHemisphere() {
        const center = new THREE.Mesh(new THREE.IcosahedronGeometry(2, 2), new THREE.MeshBasicMaterial({ color: 0x333333, wireframe: true }));
        this.content.add(center);

        // False
        const g1 = new THREE.Group(); g1.position.x = -18;
        g1.add(this.createGridSphere(8, 8, 9, C.grey, 360, false));
        this.content.add(g1);
        this.addLabel('hemisphereOnly', 'false', new THREE.Vector3(-18, -12, 0), 'default');

        // True
        const g2 = new THREE.Group(); g2.position.x = 18;
        g2.add(this.createGridSphere(8, 8, 5, C.teal, 360, true));
        const gr = new THREE.GridHelper(16, 8, C.teal, 0x222222); gr.position.y = -0.5; g2.add(gr);
        this.content.add(g2);
        this.addLabel('hemisphereOnly', 'true', new THREE.Vector3(18, -12, 0), 'default');
    }
}

// Auto-initialize when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    new Rawteous3DViewer();
});
