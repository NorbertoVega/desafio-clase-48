import { Application } from "./deps.ts";
import { routerProduct } from "./src/routes/product.routes.ts";
import { routerCart } from "./src/routes/cart.routes.ts";

const app = new Application();

app.use(routerProduct.routes());
app.use(routerCart.routes());

app.listen({ port: 8080 });
console.log(`Server on http://localhost:8080/`);
