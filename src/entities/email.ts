export class Email{
    static validate (email: String){
        if (!email){
            return false
        }
        return true
    }
}