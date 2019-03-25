  <div class="container">

    <div class="columns">
      <div class="column is-10-mobile is-offset-1-mobile is-8 is-offset-2 has-text-centered blog-entry-head">
        <h2 class="title">The holy wars: tabs vs spaces et al.</h1>
          <h4 class="subtitle">
            1
            <sup>st</sup> Aug, 2018
          </h4>

      </div>
    </div>

    <div class="columns">
      <div class="column is-10-mobile is-offset-1-mobile is-8 is-offset-2">

        <figure class="image blog-image">
          <img src="images/holy-war.jpg" />
        </figure>

        <p class="text">
          As the field of programming fluctuates between art and science, there are certain debates that have been raging on for generations.
          It's finally time to put these to bed.
        </p>


        <h4 class="subtitle is-4">Tabs vs. Spaces</h4>
        <p class="text">
          To tab or not to tab, that is the question. And what a question it is - there has been reams of literature and debate on
          this very fine aspect of software engineering because it affects just about any endeavour that requires any form
          of code being manually written and stored. In fact, a good many projects never even saw the light of day because
          their co-founders were stuck in an endless recursive loop of submitting merge requests that reformatted all their
          code from tabs to spaces and vice-versa.
        </p>

        <p class="text">
          Let us dive into the debate headfirst and analyse each of the points presented from both sides:
        </p>

        <div class="box">
          <p>
            <strong>Spacing</strong>
          </p>
          <p>
            A space takes up 1 column whereas a tab can take up any number of columns depending upon the environment configuration. This
            means that spaces lead to a more consistent display of code. The counter argument to this is usually that tabs
            are better as they allow developers with different preferences in indentation size to change how it looks without
            needing to change the code itself.
          </p>
        </div>

        <div class="box">
          <p>
            <strong>Size</strong>
          </p>
          <p>
            Using a single tab to specify 4 spaces of indentation is faster and results in a smaller file size. The counter argument
            to this is usually that modern day IDEs can just as easily convert all tabs to spaces on save and moreover, compiled
            or compressed code will already have all the fat trimmed out of it.
          </p>
        </div>

        <p class="text">
          Well, that's about it. At the end of the day, the whole debate boils down to individual preferences regarding how one likes
          to read code. Given that reading code is what most software development is all about really, it is quite understandable
          that people get so heated up about it. Many even resort to writing blog posts
          <sup>1, 2, 3</sup> and eventually
          <a href="http://uk.businessinsider.com/tabs-vs-spaces-from-silicon-valley-2016-5?r=US&IR=T">tv shows</a>. It has even been recently surmised that
          <a href="https://stackoverflow.blog/2017/06/15/developers-use-spaces-make-money-use-tabs/">developers using spaces make more money than those who use tabs</a>.
        </p>

        <p class="text">
          As the data scientists themselves note, correlation is not causation and therefore no scientific conclusions can be drawn
          from the lack of the Tab character in source code. However despair not, dear Reader, for Software Dawg has the
          answer and you need not ask any more questions on Stackoverflow only to get downvoted into oblivion for having
          asked such an obvious duplicate.
        </p>

        <p class="text">
          Software Dawg's recommendation is very straightforward: since the pursuit of more money only leads to more problems, in the
          spirit of living frugally and earning less, the axe falls on the side of the tab
          <sup>4</sup>.
        </p>

        <article class="message blockquote">
          <div class="message-body">
            <div class="quote">&quot;Use tabs, not too many, mostly 2 spaced.&quot;</div>
            <div class="cite">- Software Dawg</div>
          </div>
        </article>

        <p class="text">
          Save on source code size, complete flexibility in terms of viewing and in the ideal case your code is well under the
          80 character column limit. But then again, who really ssh's into production servers and fires up vim to modify
          the shopping cart backend so that it can accept more than one brand of toilet-paper? Those neckbeards...
        </p>

        <h4 class="subtitle is-4">Semi-colons or no semi-colons</h4>
        <p class="text">
          This is not much of a debate when using real programming languages. Most languages require the use of a semi-colon to clearly
          distinguish between statements and some like Python rely exclusively on whitespace for parsing and tokenization.
        </p>

        <p class="text">
          Javascript thankfully never fell into this trap of requiring programmers to commit to writing consistent code.
          Unfortunately however, we programmers are quite a masochistic lot and therefore the need to argue about the usage
          of semi-colons or no semi-colons in Javascript is a no-brainer. Luckily for you, after years of wrangling with this dilemma software
          dawg has the answer:
        </p>

        <article class="message blockquote">
          <div class="message-body">
            <div class="quote">&quot;NO SEMI-COLONS PLZ.&quot;</div>
            <div class="cite">- Software Dawg</div>
          </div>
        </article>

        <p class="text">
          The reasoning behind this is simple. The less characters you have in your source files, the less space they need. The reduced
          file size means lesser data sent over the pipe (which in Javascript's case is the majority form of delivery) and
          therefore a reduction in electricity costs which helps fighting global warming!
        </p>
        <p class="text">
          In fact, you should also probably only use global variables and closures to reduce the total amount of code you need to write.
          Also, forget about tests - rock star programmers add features directly in production using a web IDE.
        </p>

        <h4 class="subtitle is-4">CamelCase or snake_case</h4>
        <p class="text">
          This is a very interesting debate steeped in history. The initial programming languages fostered a snake_case standard which
          survived well into the 21st century. However, the rise of scripting languages such as Javascript and people simply
          too lazy to search for the
          <code>_</code> key, lead to meteoric rise in popularity of CamelCase.
        </p>

        <p class="text">
          In fact, there were even times where a mix of the two was employed:
        </p>

        <pre>
@Test
void test_addUserWithoutNameThrowsException() {
  ...
}
</pre>

        <p class="text">
          Fortunately for of us, none of those developers are working on any mission critical software at the moment.
        </p>

        <p class="text">
          This debate is actually very easily settled because of the fact that there are no good screen readers that can
          <a href="https://stackoverflow.com/questions/1740116/for-what-reason-do-we-have-the-lower-case-with-underscores-naming-convention/1740152#1740152">reliably distinguish between cases</a>. Therefore, in the name of accessiblity, snake_case wins this one hands
          down.
        </p>

        <h4 class="subtitle is-4">Vim vs emacs</h4>
        <p class="text">
          Well, well, well, this is a question that pops up every once in a while as people find themselves having to deal with linux
          servers and other real operating systems. &quot;Which text editor should I invest time in learning? Emacs or Vim?&quot;
          While this question has largely already been settled by the internet (hint: the answer is none, use pico if you
          must otherwise you shouldn't really be ssh'ing into anywhere really), we will include it here for completeness
          and also because we disagree with the opinion of a large majority of script kiddies.
        </p>

        <div class="content">
          <p>
            There are 2 main differences between the two software programs:
          </p>

          <ol class="content">
            <li>Emacs was initially released in 1976 and Vim came much later with its initial release in 1991.</li>
            <li>Emacs is an operating system, whereas Vim is a text editor.</li>
          </ol>
        </div>

        <p class="text">
          So based on the differences, it is clear that one should invest time in learning Vim. It will come in handy if you ever need
          to edit files.
        </p>


        <h4 class="subtitle is-4">References</h4>

        <p class="text">
          [1]
          <a href="http://www.python.org/dev/peps/pep-0008/">Guido van Rossum</a>
          <br /> [2]
          <a href="https://www.jwz.org/doc/tabs-vs-spaces.html">Jamie Zawinski</a>
          <br /> [3]
          <a href="https://blog.codinghorror.com/death-to-the-space-infidels/">Jeff Atwood</a>
          <br /> [4] Full disclosure, Software Dawg loves the $$$, so he always uses spaces.
        </p>
      </div>
    </div>
  </div>
