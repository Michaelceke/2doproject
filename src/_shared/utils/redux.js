import { lowerCase } from 'lodash';

export const createActionType = (
    type,
    entity = 'app'
) => ({
    START: `@@${lowerCase(entity)}/${type}_START`,
    SUCCESS: `@@${lowerCase(entity)}/${type}_SUCCESS`,
    ERROR: `@@${lowerCase(entity)}/${type}_ERROR`,
    END: `@@${lowerCase(entity)}/${type}_END`,
});

export const createActionString = (type,entity = 'app') =>
    `@@${lowerCase(entity)}/${type}`;


export const capIstLetterSentence = name => {
    return (
        name &&
        name
            .charAt(0)
            .toUpperCase()
            .concat(name.slice(1))
    );
};

/*
export const arrayToById = (array = []) => {
    return array.reduce((accumulator, currentObject) => {
        const { _id } = currentObject;
        accumulator[_id] = currentObject;
        return accumulator;
    }, {});
};
*/
