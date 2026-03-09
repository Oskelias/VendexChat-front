
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error('Missing Supabase environment variables')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

async function seed() {
    console.log('Seeding data...')

    // 1. Create/Ensure Store
    const { data: store, error: storeError } = await supabase
        .from('stores')
        .upsert({
            slug: 'morfi-demo',
            name: 'Morfi Demo Store',
            whatsapp: '5491122334455',
            is_active: true
        }, { onConflict: 'slug' })
        .select()
        .single()

    if (storeError) {
        console.error('Error seeding store:', storeError)
        return
    }
    console.log('Store seeded:', store.name)

    // 2. Create/Ensure Category (Optional but good)
    const { data: category, error: catError } = await supabase
        .from('categories')
        .upsert({
            store_id: store.id,
            name: 'Comida'
        }, { onConflict: 'store_id,name' })
        .select()
        .single()

    if (catError) {
        console.error('Error seeding category:', catError)
    }

    // 3. Create/Ensure Product
    const { data: product, error: prodError } = await supabase
        .from('products')
        .upsert({
            store_id: store.id,
            category_id: category?.id,
            name: 'Hamburguesa Completa',
            description: 'Hamburguesa con queso, lechuga, tomate y huevo.',
            price: 1500,
            is_active: true
        }, { onConflict: 'store_id,name' })
        .select()
        .single()

    if (prodError) {
        console.error('Error seeding product:', prodError)
    } else {
        console.log('Product seeded:', product.name)
    }

    console.log('Done!')
}

seed()
