import isMobile from '@/utils/is-mobile';

import type {Notifications} from './types';

const title = 'Hedgehog Lab';

const email = 'agd@hedgehog-computing.com';

const repository = 'https://github.com/Hedgehog-Computing/hedgehog-lab';

const messages = {
    app: {
        crash: {
            title: 'Oooops... Sorry, I guess, something went wrong. You can:',
            options: {
                email: `contact with author by this email - ${email}`,
                reset: 'Press here to reset the application',
            },
        },
    },
    loader: {
        fail: 'Hmmmmm, there is something wrong with this component loading process... Maybe trying later would be the best idea',
    },
    images: {
        failed: 'something went wrong during image loading :(',
    },
    404: 'Hey bro? What are you looking for?',
};

const dateFormat = 'MMMM DD, YYYY';

const notifications: Notifications = {
    options: {
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
        },
        autoHideDuration: 6000,
    },
    maxSnack: isMobile ? 3 : 4,
};

const loader = {
    // no more blinking in your app
    delay: 300, // if your asynchronous process is finished during 300 milliseconds you will not see the loader at all
    minimumLoading: 700, // but if it appears, it will stay for at least 700 milliseconds
};

const defaultMetaTags = {
    image: '/cover.png',
    description: 'Run, compile and execute JavaScript for Scientific Computing and Data Visualization TOTALLY TOTALLY TOTALLY in your BROWSER! An open source scientific computing environment for JavaScript TOTALLY in your browser, matrix operations with GPU acceleration, TeX support, data visualization and symbolic computation.',
};
const giphy404 = 'https://giphy.com/embed/xTiN0L7EW5trfOvEk0';

export {
    loader,
    notifications,
    dateFormat,
    messages,
    repository,
    email,
    title,
    defaultMetaTags,
    giphy404,
};
