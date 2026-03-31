/* 1. What is SQL injection? How can you avoid it?
   2. What are XSS attacks? How can you avoid it?
   3. Without any debug, what is the lake of performance in the following code?

      class Stack {
            static final int MAX = 16;
            int size = 0;
            elements = new elements[MAX]; // Maximum size of Stack

            push(element e)
               ensureCapacity();
               elements[size++] = e;
            }

            pop() {
               if (element.length == 0)
                  throw new Error();
               return elements[size--];
            }

            ensureCapacity()  {
                 if (elements.length == size)  {
                     elements = Arrays.copyOf(elements, elements.length * 2 + 1);
                 }
            }
      }

   4. We want to build a system that connects with warehouses, to servers,
      and to our retailers. We need to aggregate the sum of all products,
      and notify the retailers for any change. Also, we connect to the warehouses
      to fetch data each specific time (lets say, each hour).
      Describe the system in high-level perspective.
 */