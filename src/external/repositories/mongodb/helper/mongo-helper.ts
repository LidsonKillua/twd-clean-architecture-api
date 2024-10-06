import { MongoClient, Collection } from 'mongodb'

export const MongoHelper = {
    client: null as MongoClient,
    
    async connect (uri: string): Promise<void> {
        this.client = await MongoClient.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    },
    
    async disconnect (): Promise<void> {
        await this.client.close()
        this.client = null
    },
    
    async getCollection (name: string): Promise<Collection> {
        return this.client.db().collection(name)
    },
    
    clearCollection (name: string): void {
        this.client.db().collection(name).deleteMany({})
    }
}