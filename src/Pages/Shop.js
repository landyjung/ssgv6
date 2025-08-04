import ProductList from "../Components/ProductList";
import SpecialList from "../Components/SpecialList";
import GoodsList from "../Components/GoodsList";

function Shop(){
    return(
    <section id="shop">
        <p className="main_title">Shop</p>
        <ProductList />
        <SpecialList />
        <GoodsList />
    </section>
    )
}
export default Shop;