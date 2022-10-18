const handlers = {};

const trigger = (type, ...args) => {
  if (handlers[type] && handlers[type].length > 0) {
    handlers[type].forEach((h) => h(...args));
  }
};

const on = (type, handler) => {
  const handlerWithArgs = (...args) => {
    return handler(...args);
  };

  if (type in handlers) {
    handlers[type] = [...handlers[type], handlerWithArgs];
    return;
  }

  handlers[type] = [handlerWithArgs];
};

const off = (type) => {
  if (type in handlers) {
    delete handlers[type];
  }
};

// Testing removing the same handler

const onFoo = () => {
  console.log("Do foo");
};

on("newFoo", onFoo);
off("newFoo", onFoo);

trigger("newFoo");

// Testing logging a handler with the same name multiple times

on("foo", () => {
  console.log("Do foo");
});

on("foo", () => {
  console.log("Do some other foo");
});

trigger("foo");

// Testing with arguments

on("fooWithArgs", (arg1, arg2) => {
  console.log("here are my args", arg1, arg2);
});

trigger("fooWithArgs", "hello", "world");

// To-do: Unit test
