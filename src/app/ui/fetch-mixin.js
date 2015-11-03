import {getList, getOne} from '../store';

export default {

	getInitialState: function () {
		return {
			fetched: false
		};
	},

	componentDidMount() {
		var {model, collection} = this.state;
		var self = this;
		if (collection) {
			getList(collection.name, {
				success(data) {
					collection.data = data;
					self._onSync();
				}
			});
		} else if (model && model.id) {
			getOne(model.name, model.id, {
				success(data) {
					model.attributes = data;
					self._onSync();
				}
			})
		}
	},

	_onSync() {
		if (this.onSync) {
			this.onSync();
		}
		this.setState({fetched: true}, this.onFetch);
	}

};
