const logger = store => next => action => {
    if (typeof action === 'function') console.log('dispatching a function');
    else console.log('loggerMiddleware dispatch',action);
    let result = next(action);
    console.log('loggerMiddleware next state',store.getState());
    return result;
}

const crashReporter = store => next => action => {
    try {
        return next(action)
    } catch (err) {
        console.error('crashReporterMiddleware Caught an exception!', err)
        Raven.captureException(err, {
            extra: {
                action,
                state: store.getState()
            }
        })
        throw err
    }
}

export  {logger,crashReporter}