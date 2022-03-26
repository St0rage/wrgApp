import moment from 'moment'
import 'moment/locale/id'

export const dateFormat = (date) => {
    moment.locale('id')

    return moment.unix(date).format('dddd D MMM YYYY H:mm')
}