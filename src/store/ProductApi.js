import config from './Config';

const instance = config.axiosInstance;

const ProductApi = {
	get: (data) => {
		return instance.get('products', {
			params: data
		});
	}
}

export default ProductApi