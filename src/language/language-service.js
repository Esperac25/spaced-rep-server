const { LinkedList } = require("../utils/LinkedList");

const LanguageService = {
	getUsersLanguage(db, user_id) {
		return db
			.from("language")
			.select(
				"language.id",
				"language.name",
				"language.user_id",
				"language.head",
				"language.total_score"
			)
			.where("language.user_id", user_id)
			.first();
	},
	populateLinkedList(arr, language) {
		let list = new LinkedList();

		let curr = arr.find((e) => e.id === language.head);
		list.insertLast(curr);

		while (curr.next !== null) {
			debugger;
			curr = arr.find((e) => e.id === curr.next);
			list.insertLast(curr);
		}
		return list;
	},
	getLanguageWords(db, language_id) {
		return db
			.from("word")
			.select(
				"id",
				"language_id",
				"original",
				"translation",
				"next",
				"memory_value",
				"correct_count",
				"incorrect_count"
			)
			.orderBy("next", "ascending")
			.where({ language_id });
	},
	getNextWord(db, head) {
		return db
			.from("word")
			.select("original", "correct_count", "incorrect_count")
			.where("word.id", head)
			.then((word) => {
				return {
					nextWord: word[0].original,
					wordCorrectCount: word[0].correct_count,
					wordIncorrectCount: word[0].incorrect_count,
				};
			});
	},
	updateWords(db, list, langId, add) {
		return db.transaction(async (trx) => {
			return Promise.all([
				trx("language").where({ id: langId }).update({
					total_score: add,
					head: list[0].id,
				}),
				...list.map((word, i) => {
					let next;
					if (i + 1 >= list.length) {
						word.next = null;
					} else {
						word.next = list[i + 1].id;
					}
					return trx("word")
						.where({ id: word.id })
						.update({ ...word });
				}),
			]);
		});
	},
};

module.exports = LanguageService;
