import { Handler } from 'express';

const notFound: Handler = (_req, res) => {
    res.status(404).send();
};

export default notFound;