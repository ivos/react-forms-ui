import State from '../state';

export default {

	getInitialState: function () {
		return {
			fetched: false
		};
	},

	componentDidMount() {
		var {model, collection} = this.state;
		if (collection) {
			collection.data = State[collection.name];
			this._onSync();
		} else if (model && model.id) {
			model.attributes = State[model.name][model.id];
			this._onSync();
		}
	},

	_onSync() {
		if (this.onSync) {
			this.onSync();
		}
		this.setState({fetched: true}, this.onFetch);
	}

};
