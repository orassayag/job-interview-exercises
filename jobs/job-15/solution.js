/* 1. What is SQL injection? How can you avoid it?

   SQL Injection (SQLi) is a type of an injection attack that makes it possible to execute malicious SQL statements.
   These statements control a database server behind a web application. Attackers can use SQL Injection
   vulnerabilities to bypass application security measures. They can go around authentication and authorization
   of a web page or web application and retrieve the content of the entire SQL database. They can also use SQL
   Injection to add, modify, and delete records in the database.

   The only sure way to prevent SQL Injection attacks is input validation and parametrized queries including
   prepared statements. The application code should never use the input directly. The developer must
   sanitize all input, not only web form inputs such as login forms.

   2. What are XSS attacks? How can you avoid it?

   Cross-Site Scripting (XSS) attacks are a type of injection, in which malicious scripts are injected into
   otherwise benign and trusted websites. XSS attacks occur when an attacker uses a web application to send
   malicious code, generally in the form of a browser side script, to a different end user. Flaws that allow
   these attacks to succeed are quite widespread and occur anywhere a web application uses input from a user
   within the output it generates without validating or encoding it.

   Here are a few ways to protect yourself:
   * Filter input on arrival - At the point where user input is received, filter as strictly as possible based
   on what is expected or valid input.
   If attribute is quoted, breaking out requires the corresponding quote. All attributes should be quoted but
   your encoding should be strong enough to prevent XSS when intrusted data is placed in unquoted contexts.
   Unquoted attributes can be broken out of with many characters including [space] % * + , - / ; < = > ^ and |.
   * Encode data on output - At the point where user-controllable data is output in HTTP responses, encode the
   output to prevent it from being interpreted as active content. Depending on the output context,
   this might require applying combinations of HTML, URL, JavaScript, and CSS encoding.
   Example:
   <META HTTP-EQUIV="refresh"
   CONTENT="0;url=data:text/html;base64,PHNjcmlwdD5hbGVydCgndGVzdDMnKTwvc2NyaXB0Pg">
   * Use appropriate response headers - To prevent XSS in HTTP responses that aren't intended to contain any
   HTML or JavaScript, you can use the Content-Type and X-Content-Type-Options headers to ensure that
   browsers interpret the responses in the way you intend.
   Example: Content-Type header is application/json and not text/html
   * Content Security Policy - As a last line of defense, you can use Content Security Policy (CSP) to reduce
   the severity of any XSS vulnerabilities that still occur.
   Example: Content-Security-Policy: default-src: 'self'; script-src: 'self' static.domain.tld
   * Use HTTPOnly cookie flag
   * Properly use modern JS frameworks (React, Vue, Angular, Svelte):
   JavaScript framework |	Dangerous methods / props
   Angular (2+)         |	bypassSecurityTrust
   React	               |  dangerouslySetInnerHTML
   Vue (2+)             |	v-html
   Svelte               |	{@html ...}

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

      In the following code, there is no place where the pointers are cleared, and the elements
      are discared. Add the following to the code, to keep the code memory clean:
      for (int i = 0; i < elements.length; i++)
         elements[i] = null;

   4. We want to build a system that connects with warehouses, to servers,
      and to our retailers. We need to aggregate the sum of all products,
      and notify the retailers for any change. Also, we connect to the warehouses
      to fetch data each specific time (lets say, each hour).
      Describe the system in high-level perspective.

      A number of multiple servers (like Node) will fetch the data from the warehouses
      and will aggregate the sum of all products. A job fetcher on the background will
      run and will assign the fetch data tasks in queue for each warehouse. When the task
      is finished, it will automatically be cleared from the queue. That can be achieved by
      using message brokers like RabbitMQ. They will also add retries mechanism for
      handling cases where the warehouse API is down: number of retries will occur, and
      in each failure of accessing the warehouse API, the delta of the time for the next
      attempt to access the server will grow.
 */