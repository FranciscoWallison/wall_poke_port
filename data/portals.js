const portalsMapData =
[
    [
        {
            type: {
                id: 11224,
                type: 'portal',
                validBtn: "up"
            },          
            teleport: 2,
            img: './img/mapas/inicial/portals/porta_1.png',
            animate: false,
            frames: {
                max: 6,
                hold: 6
            },
            scale: 0.8
        },
        {
            type: {
                id: 15484,
                type: 'placa',
                color: "#ccc",
                title: "Placa",
                text: "Testando a Placa, isso é um teste e um texto para a placa e estou testando... acho que entendeu isso já né?!"
            },
            img: './img/collision_defout.png',
            animate: false,
            scale: 0.8
        }
    ],
    [
    ],
    [
        {
            type: {
                id: 20766,
                type: 'portal',
                validBtn: "down"
            },
            teleport: 0,
            img: './img/mapas/inicial/portals/collision_portal.png',
            animate: false,
            frames: {
                max: 1,
                hold: 10
            },
            scale: 1.6
        }
    ],
]