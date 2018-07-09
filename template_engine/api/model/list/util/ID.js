var _count = 0
export default class ID {
	static next() {
		return ++_count
	}
}