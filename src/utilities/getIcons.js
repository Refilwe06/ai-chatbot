const getIconPath = (iconName) => {

    switch (iconName) {
        case 'chat':
            return 'M12 20.25c-4.97 0-9-3.694-9-8.25s4.03-8.25 9-8.25 9 3.694 9 8.25c0 2.104-.859 4.023-2.273 5.48-.432.447-.74 1.04-.586 1.641a4.483 4.483 0 0 0 .923 1.785A5.969 5.969 0 0 1 18 21c-1.282 0-2.47-.402-3.445-1.087-.81.22-1.668.337-2.555.337Z';
        case 'members':
            return 'M210,210 L195,210 L195,172.5 C194.976441,151.799088 178.200912,135.023559 157.5,135 L157.5,120 C186.481585,120.03224 209.96776,143.518415 210,172.5 L210,210 Z M150,210 L135,210 L135,172.5 C134.975616,151.79943 118.20057,135.024384 97.5,135 L52.5,135 C31.7994303,135.024384 15.0243835,151.79943 15,172.5 L15,210 L0,210 L0,172.5 C0.0338895406,143.5191 23.5190997,120.03389 52.5,120 L97.5,120 C126.4809,120.03389 149.96611,143.5191 150,172.5 L150,210 Z M135,0 L135,15 C155.710678,15 172.5,31.7893219 172.5,52.5 C172.5,73.2106781 155.710678,90 135,90 L135,105 C163.994949,105 187.5,81.4949494 187.5,52.5 C187.5,23.5050506 163.994949,0 135,0 L135,0 Z M75,15 C95.7106781,15 112.5,31.7893219 112.5,52.5 C112.5,73.2106781 95.7106781,90 75,90 C54.2893219,90 37.5,73.2106781 37.5,52.5 C37.5,31.7893219 54.2893219,15 75,15 M75,0 C46.0050506,0 22.5,23.5050506 22.5,52.5 C22.5,81.4949494 46.0050506,105 75,105 C103.994949,105 127.5,81.4949494 127.5,52.5 C127.5,38.5761343 121.968766,25.2225539 112.123106,15.376894 C102.277446,5.53123412 88.9238657,0 75,0 Z';
        case 'integrations':
            return 'M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5';
        case 'refer_friends':
            return 'M724.787 962c-97.951 0-177.631-79.68-177.631-177.631 0-97.953 79.68-177.633 177.631-177.633 97.952 0 177.632 79.68 177.632 177.633 0 97.951-79.68 177.631-177.632 177.631z m0-284.211c-58.771 0-106.578 47.809-106.578 106.58 0 58.77 47.807 106.578 106.578 106.578s106.579-47.809 106.579-106.578c0-58.771-47.807-106.58-106.579-106.58z m-425.576 23.684c-97.951 0-177.631-79.68-177.631-177.631 0-97.952 79.68-177.631 177.631-177.631 97.953 0 177.633 79.68 177.633 177.631s-79.68 177.631-177.633 177.631z m0-284.21c-58.771 0-106.578 47.808-106.578 106.579 0 58.771 47.808 106.578 106.578 106.578 58.771 0 106.58-47.807 106.58-106.578s-47.809-106.579-106.58-106.579z m425.576 0c-97.951 0-177.631-79.68-177.631-177.631S626.836 62 724.787 62c97.952 0 177.632 79.68 177.632 177.632s-79.68 177.631-177.632 177.631z m0-284.211c-58.771 0-106.578 47.808-106.578 106.579S666.016 346.21 724.787 346.21s106.579-47.808 106.579-106.579-47.807-106.579-106.579-106.579z M587.297 743.43L398.309 625.008l37.722-60.227 188.989 118.42zM591.103 311.437l35.385 61.618-193.392 111.057-35.385-61.618z';
        case 'pricing_plans':
            return 'M8 17.345a4.76 4.76 0 0 0 2.558 1.618c2.274.589 4.512-.446 4.999-2.31.487-1.866-1.273-3.9-3.546-4.49-2.273-.59-4.034-2.623-3.547-4.488.486-1.865 2.724-2.899 4.998-2.31.982.236 1.87.793 2.538 1.592m-3.879 12.171V21m0-18v2.2';
        case 'settings':
            return 'M50,5 L90,25 L90,75 L50,95 L10,75 L10,25 Z M50,30 A20,20 0 1,1 50,70 A20,20 0 1,1 50,30 Z';
        case 'paper_plane':
            return 'M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5';
        case 'microphone':
            return 'M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z';
        case 'close':
            return 'M6 18 18 6M6 6l12 12';
        case 'like':
            return 'M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z'
        case 'dislike':
            return 'M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54'
        default:
            return 'M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z';
    }
}

export default getIconPath;