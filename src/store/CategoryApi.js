import config from './Config';

const instance = config.axiosInstance;

const CategoryApi = {
	get: (data) => {
		return instance.get('categories', {
			params: data
		});
	}
}

export default CategoryApi