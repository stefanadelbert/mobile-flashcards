import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

export function within24hrs(earlier, later) {
    console.log('within24hrs', earlier, later);
    return (later - earlier) < (24 * 60 * 60 * 1000)
}

const NOTIFICATIONS_STORAGE_KEY = '@mobile-flashcards:notifications';

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATIONS_STORAGE_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
    title: "Do a quiz",
    body: "Don't forget to do a quiz today",
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
    AsyncStorage.getItem(NOTIFICATIONS_STORAGE_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()

                            let tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate() + 1)
                            tomorrow.setHours(20)
                            tomorrow.setMinutes(0)

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day',
                                }
                            )

                            AsyncStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(true))
                        }
                        else {
                            console.error('Couldn\' get permission for notifications');
                        }
                    })
            }
        })
}
