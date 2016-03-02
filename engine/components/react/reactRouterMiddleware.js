import React from 'react';
import {Router, match, RouterContext} from "react-router";
import ReactDOMServer, {renderToStaticMarkup} from "react-dom/server"
import createMemoryHistory from 'history/lib/createMemoryHistory';
import createLocation from 'history/lib/createLocation';

import expressApp from "../utils/expressAppSingleton";

export default function(rawRoutes) {
	let routes = rawRoutes;
	expressApp.use(function(req, res, next) {
		if(req.url.indexOf("\.") < 0 && req.url.indexOf("api") < 0) {
			let location = createLocation(req.url);
			let alternativeroutes = routes;

			match({ routes, location }, (error, redirectLocation, renderProps) => {
			    if (redirectLocation) {
			      res.redirect(301, redirectLocation.pathname + redirectLocation.search)
			    } else if (error) {
			      res.send(500, error.message)
			    } else if (renderProps == null) {
			      res.send(404, 'Not found')
			      next();
			    } else {
			    	req.renderProps = renderProps;
					req.reactComponent = ReactDOMServer.renderToString(<RouterContext {...renderProps} />);
					next();
			    }
			  });
		} else {
			next();
		}
	});
}
