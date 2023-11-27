export default function resolvePromise(promise, promiseState) {
	promiseState.promise = promise;
	promiseState.data = null;
	promiseState.error = null;

	if (promiseState.promise) {
		promise.then(getDataACB).catch(getErrorACB);
	}

	function getDataACB(data) {
		if (promiseState.promise === promise) promiseState.data = data;
	}

	function getErrorACB(error) {
		if (promiseState.promise === promise) promiseState.error = error;
	}
}
