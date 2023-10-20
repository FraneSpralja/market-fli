import app from '@/firebase/config'
import { getStorage } from 'firebase/storage'

const storage = getStorage(app)

export default storage