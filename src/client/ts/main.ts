import { TrainSignboard } from "./boards/TrainSignboard";

const pageTypeMetaElement = document.querySelector('meta[name="tracker"]');

if (!pageTypeMetaElement)
    throw new Error('Page is missing meta element indicating whether this should be a train or a bus tracker');

const pageType = pageTypeMetaElement.getAttribute('content');

const modules: Array<string> = [];
let className: string;

switch (pageType) {
    case 'train': {
        window.TrainSignboard = new TrainSignboard();
        break;
    }
    // case 'bus': {
    //     modules.push('client/ts/boards/BusSignboard');
    //     className = 'BusSignboard';
    //     break;
    // }
    default: {
        throw new Error(`Invalid page type: ${pageType}. Expected 'train' or 'bus'.`);
    }
}

const getVersion = async (): Promise<string | null> => {
    const result = await fetch('/client-version');

    if (!result.ok) {
        console.error('Trouble fetching current client version.');
        return null;
    }

    return await result.text();
};

const setupVersionCheck = async (): Promise<void> => {
    window.clientVersion = await getVersion();

    window.setInterval(async () => {
        const newVersion = await getVersion();
        
        if (newVersion !== window.clientVersion)
            window.location.reload();
    }, 900000);
};

setupVersionCheck().then();
