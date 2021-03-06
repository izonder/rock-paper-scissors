export class Observer {
    registry = new Map();

    /**
     * Set handler
     * @param {string} event
     * @param {Function} cb
     */
    on(event, cb) {
        this.registry.set(event, cb);
    }

    /**
     * Create middleware handler
     * @returns {Function}
     */
    createMiddleware() {
        return (store) => (dispatch) => (action) => {
            const {type} = action || {},
                handler = this.registry.get(type);

            if (handler && typeof handler === 'function') handler({store, dispatch, action});
        };
    }

    /**
     * Create reducer handler
     * @param {*} initialState
     * @returns {Function}
     */
    createReducer(initialState) {
        return (state = initialState, action) => {
            const {type} = action || {},
                handler = this.registry.get(type);

            if (handler && typeof handler === 'function') return handler({state, action});

            return state;
        };
    }
}
