let nextId = 1

const notificationCollection = notification => {
    let collection = []

    if(Array.isArray(notification.message)) {
        collection = handleMessageArray(notification.message, notification.type)
    } else if (
        typeof notification.message == 'object'
        && !Array.isArray(notification.message)
        && notification.message != null
    ) {
        collection = handleMessageObject(notification.message, notification.type)
    } else {
        collection.push(handleMessageString(notification.message, notification.type))
    }

    return collection
}

const handleMessageArray = (messageArray, type) => {
    return messageArray.map(value => {
        return {
            type,
            message: value
        }
    })
}

const handleMessageString = (messageString, type) => {
    return {
        type,
        message: messageString
    }
}

const handleMessageObject = (messageObject, type) => {
    let collection = []

    for (const property in messageObject) {
        const messageOfProperty = messageObject[property]

        if(Array.isArray(messageOfProperty)) {
            collection = collection.concat(
                handleMessageArray(messageOfProperty, type)
            )
        } else {
            collection.push(
                handleMessageString(messageOfProperty, type)
            )
        }
    }

    return collection
}

export const notification = {
    namespaced: true,
    state: {
        notifications: []
    },
    mutations: {
        PUSH (state, notification) {
            state.notifications.push({
                ...notification,
                id: nextId++
            })
        },
        DELETE(state, notificationToRemove) {
            state.notifications = state.notifications.filter(
                notification => notification.id !== notificationToRemove.id
            )
        }
    },
    actions: {
        add (context, notification) {
            notificationCollection(notification).forEach(element => {
                context.commit('PUSH', element)
            })
        },
        remove (context, notificationToRemove) {
            context.commit('DELETE', notificationToRemove)
        }
    }
}

