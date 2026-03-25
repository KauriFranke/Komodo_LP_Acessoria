/**
 * Revelar ao entrar na viewport (gatilho "em exibição").
 * Parâmetros alinhados ao Framer: Enter com opacidade 0, Y +50, 600ms ease-out.
 */
(function () {
    "use strict";

    var seletor = "[data-revelar-ao-exibir]";
    var classeVisivel = "revelar-visivel";
    var elementos = document.querySelectorAll(seletor);

    function revelarTodos() {
        elementos.forEach(function (el) {
            el.classList.add(classeVisivel);
        });
    }

    if (!elementos.length) {
        return;
    }

    if (!("IntersectionObserver" in window)) {
        revelarTodos();
        return;
    }

    var observador = new IntersectionObserver(
        function (entradas) {
            entradas.forEach(function (entrada) {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add(classeVisivel);
                } else {
                    /* Saiu da tela: volta ao estado Enter para poder animar de novo ao rolar para cima */
                    entrada.target.classList.remove(classeVisivel);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px",
        }
    );

    elementos.forEach(function (el) {
        observador.observe(el);
    });
})();
