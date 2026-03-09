
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function checkStores() {
    console.log('Fetching stores...')
    const { data: stores, error } = await supabase
        .from('stores')
        .select('*')

    if (error) {
        console.error('Error fetching stores:', error)
        return
    }

    console.log('Stores found:')
    const store = stores.find(s => s.slug === 'morfiviandas');
    if (store) {
        console.log(`--- Store: ${store.name} ---`);
        console.log('Metadata:', JSON.stringify(store.metadata, null, 2));
    } else {
        console.log('Store morfiviandas not found');
    }
}

checkStores()
