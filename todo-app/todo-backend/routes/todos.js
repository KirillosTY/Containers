const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const {getAsync, setAsync} = require('../redis/index')

const todo_key = 'added_todos'

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

router.get('/statistics', async (_, res) => {
  const count = await getAsync(todo_key)
  
  res.send({"added_todos":count});
});

router.get('/:id', async (req, res) => {
  const todos = await Todo.find({_id:req.params.id})
  res.send(todos);
});


/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  if(res.statusCode == 200){
    let count = await getAsync(todo_key)
    if(isNaN(count)){

      count = 0
    }
     await setAsync(todo_key, Number(count)+1)
    
   

  }
  res.send(todo);
});


router.put('/:id', async (req, res) => {
  console.log('req.body', req.body)
  const todo = await Todo.updateOne(
    {_id:req.params.id},
    {text: req.body.text,
    done: req.body.done}
  )
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.sendStatus(405); // Implement this
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  res.sendStatus(405); // Implement this
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
