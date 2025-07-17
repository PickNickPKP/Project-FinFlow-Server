
### env guide
PORT=8999   
DATABASE_URL="mysql://root:PickNick5530@localhost:3306/Personal-project-FinFlow"  
JWT_SECRET=Nickpkp



### service

|path |method |authen |params |query |body |
|:-- |:-- |:-- |:-- |:-- |:-- |
|/api/auth/login|post|-|-|-|{identity, password}|
|/api/auth/register|post|-|-|-| {email , username ,password ,confirmPassword, capital}|
|/api/overview|get|y|-|-|-|
|/api/overview/day|get|y|-|-|-|
|/api/overview/month|get|y|-|-|-|
|/api/overview/trend|get|y|-|-|-|
|/api/overview/record/income|post|y|-|-|{type_income, categoryIncome , amount}|
|/api/overview/record/income|post|y|-|-|{type_expense, categoryExpense , amount}
|/api/transaction|get|y|-|-|-|
|/api/transaction|put|y|:id|-|{categoryExpense , amount}
|/api/overview|delete|y|:id|-|-|-|
|/api/transaction/year|get|y|-|-|-|
|/api/transaction/category|get|y|-|-|-|
|/api/wallet|get|y|-|-|-|
|/api/goal/create|post|y|-|-|{year_amount ,saving_goal ,interest_rate , savemoney_per_month,name_saving}
|/api/goal/update|put|y|:id|-|{year_amount ,saving_goal ,interest_rate , savemoney_per_month,name_saving}
|/api/goal/delete|get|y|:id|-|-|


### Step 
#### step1 app.js
#### step2 auth.route.js
#### step3 auth.controller.js
#### step4 notFoundMiddleware in app.js
#### step5 errorMiddleware in app.js
#### step6 install prisma
#### step6 schema.prisma 
#### step7 เพิ่ม script seed ใน package.json




