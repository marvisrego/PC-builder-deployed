export const mockDb = {
  cpu: [
    { id: 'cpu-1', category: 'cpu', name: 'Quantum Core i9', price: 499.99, image: '/images/cpu_mockup.png', desc: '16-core, 32-thread futuristic processor', socket: 'LGA1700' },
    { id: 'cpu-2', category: 'cpu', name: 'Nova Ryzen 9', price: 449.99, image: '/images/download (1).jpg', desc: 'Ultra-efficient high performance silicon', socket: 'AM5' },
    { id: 'cpu-3', category: 'cpu', name: 'Quantum Core i5', price: 249.99, image: '/images/cpu_mockup.png', desc: '10-core, 16-thread gaming champion', socket: 'LGA1700' },
    { id: 'cpu-4', category: 'cpu', name: 'Nova Ryzen 5', price: 199.99, image: '/images/download (1).jpg', desc: 'Incredible value and efficiency', socket: 'AM5' },
  ],
  gpu: [
    { id: 'gpu-1', category: 'gpu', name: 'Vortex Titan RTX', price: 1599.99, image: '/images/gpu_mockup.png', desc: 'Tri-fan monster rendering unit', pci: 'PCIe 4.0' },
    { id: 'gpu-2', category: 'gpu', name: 'Nebula RX 8900 XT', price: 999.99, image: '/images/download (2).jpg', desc: 'Hyper-cooled RGB graphics module', pci: 'PCIe 4.0' },
    { id: 'gpu-3', category: 'gpu', name: 'CyberBlade 4070', price: 599.99, image: '/images/R6zbNW4EyUFXHdD4Laq8tb-1024-80.jpg', desc: 'Streamlined mid-range domination', pci: 'PCIe 4.0' },
    { id: 'gpu-4', category: 'gpu', name: 'Voxel Arc 770', price: 349.99, image: '/images/gpu_mockup.png', desc: 'Next-gen value rendering', pci: 'PCIe 4.0' },
  ],
  motherboard: [
    { id: 'mobo-1', category: 'motherboard', name: 'Aegis Z890 Pro', price: 299.99, image: '/images/mobo_mockup.png', desc: 'Armored ATX board with PCIe 5.0', socket: 'LGA1700' },
    { id: 'mobo-2', category: 'motherboard', name: 'Stealth B650M', price: 199.99, image: '/images/download (3).jpg', desc: 'Minimalist micro-ATX silent board', socket: 'AM5' },
    { id: 'mobo-3', category: 'motherboard', name: 'Phantom X670E', price: 399.99, image: '/images/mobo_mockup.png', desc: 'Enthusiast overclocking masterboard', socket: 'AM5' },
    { id: 'mobo-4', category: 'motherboard', name: 'Aegis Z790 Lite', price: 159.99, image: '/images/download (3).jpg', desc: 'Entry-level full ATX board', socket: 'LGA1700' },
  ],
  ram: [
    { id: 'ram-1', category: 'ram', name: 'Lumina 32GB DDR5', price: 179.99, image: '/images/ram_mockup.png', desc: 'High-speed RGB illuminated memory sticks', type: 'DDR5' },
    { id: 'ram-2', category: 'ram', name: 'Kingston FURY Beast DDR4', price: 129.99, image: '/images/FURY_Beast_RGB_Black_DDR4_1-sm.webp', desc: 'High-speed DDR4 with RGB lighting', type: 'DDR4' },
    { id: 'ram-3', category: 'ram', name: 'Void 64GB DDR5 PRO', price: 349.99, image: '/images/ram_mockup.png', desc: 'Ultra-capacity kit with matte dark heat spreaders', type: 'DDR5' },
    { id: 'ram-4', category: 'ram', name: 'Essential 16GB DDR4', price: 49.99, image: '/images/FURY_Beast_RGB_Black_DDR4_1-sm.webp', desc: 'Budget friendly memory', type: 'DDR4' },
  ],
  case: [
    { id: 'case-1', category: 'case', name: 'Obsidian Flow X', price: 149.99, image: '/images/case_mockup.png', desc: 'Sleek brushed aluminum with tempered glass', size: 'ATX' },
    { id: 'case-2', category: 'case', name: 'Lumina Tower 900', price: 189.99, image: '/images/download.jpg', desc: 'Dual-chamber high airflow RGB showcase', size: 'E-ATX' },
    { id: 'case-3', category: 'case', name: 'Stealth Box', price: 89.99, image: '/images/case_mockup.png', desc: 'Minimalist silent non-windowed case', size: 'ATX' },
    { id: 'case-4', category: 'case', name: 'Mini Hive', price: 109.99, image: '/images/download.jpg', desc: 'Compact mini-ITX cube with honeycomb mesh', size: 'Mini-ITX' },
  ],
  prebuilts: [
    { id: 'pb-1', category: 'prebuilts', name: 'The Obsidian Beast', price: 2999.99, image: '/images/case_mockup.png', desc: 'Ultimate 4K gaming and rendering rig featuring the Vortex Titan RTX and Quantum Core i9.' },
    { id: 'pb-2', category: 'prebuilts', name: 'Quantum Entry', price: 999.99, image: '/images/download.jpg', desc: 'Perfect 1080p gaming system for esports and productivity.' },
    { id: 'pb-3', category: 'prebuilts', name: 'Stealth Workstation', price: 1849.99, image: '/images/mobo_mockup.png', desc: 'A whisper-quiet setup for creative professionals.' },
    { id: 'pb-4', category: 'prebuilts', name: 'Nebula Streamer', price: 2249.99, image: '/images/gpu_mockup.png', desc: 'Dynamic RGB loaded PC perfect for simultaneous gaming and live broadcasting.' }
  ]
};
