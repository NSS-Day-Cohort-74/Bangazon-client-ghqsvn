import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../../../components/layout'
import Navbar from '../../../components/navbar'
import { Detail } from '../../../components/product/detail'
import { Ratings } from '../../../components/rating/detail'
import { getProductById, likeProduct, unLikeProduct } from '../../../data/products'
import dynamic from 'next/dynamic'

const Details = dynamic(() => import('../../../components/product/detail'), {ssr: true})
const Rating = dynamic(() => import('../../../components/rating/detail'), {ssr: true})

export default function ProductDetail() {
  const router = useRouter()
  const { id } = router.query
  const [product, setProduct] = useState({})

  const refresh = () => {
    console.log("fetching for product")
    getProductById(id).then(productData => {
      if (productData) {
        setProduct(productData)
        console.log(product)
      }
    })
  }

  const like = () => {
    likeProduct(id).then(refresh)
  }

  const unlike = () => {
    unLikeProduct(id).then(refresh)
  }

  useEffect(() => {
    console.log(id)
    if (id) {
      refresh()
    }
  }, [id])

  return (
    <div className="columns is-centered">
      <div className="column">
      
        <div> This should show up lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll</div>
        <div> This should show up lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll</div>
        <div> This should show up lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll</div>
        <div> This should show up lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll</div>
        <div> This should show up lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll</div>
        <div> This should show up lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll</div>
        <div> This should show up lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll</div>
        <Detail product={product} like={like} unlike={unlike}/>
        <Ratings
          refresh={refresh}
          number_purchased={product.number_purchased}
          ratings={product.ratings}
          average_rating={product.average_rating}
          likes={product.likes}
        />
      </div>
    </div>
  )
}

ProductDetail.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}
