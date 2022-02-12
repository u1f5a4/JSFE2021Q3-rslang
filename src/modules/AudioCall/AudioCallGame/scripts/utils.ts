import AppModel from '../../../AppModel';

const appManager = new AppModel();

export async function getWordsByGroup(groupId: number) {
    const promiseArr: any[] = []
    const maxPageNumber = 29;
    for (let i = 0; i <= maxPageNumber; i++) {
        promiseArr.push(
            ...await appManager.getWords(groupId, i)
        )
    }
    let data: any= []

    Promise.all(promiseArr).then(values => {
        data.push(...values);
    });

    return await data;
}




