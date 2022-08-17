import { Application } from "./deps.ts";
import { router } from "./src/routes/user.routes.ts";
import { routerProduct } from "./src/routes/product.routes.ts";

const app = new Application();

app.use(router.routes());
app.use(routerProduct.routes());

app.listen({ port: 8080 });
console.log(`Server on http://localhost:8080/`);
