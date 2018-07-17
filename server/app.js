import restify from 'restify';

import User from './models/user.model';

const app = restify.createServer({
	name: 'Api for real time chat'
});

app.use(restify.plugins.bodyParser());

export default app;