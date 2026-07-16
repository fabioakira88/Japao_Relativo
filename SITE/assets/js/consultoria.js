/*
 * JR Apoio no Japão — Consultoria
 * Modal único e reutilizável alimentado por assets/data/consultoria-services.json,
 * grade de serviços, formulário de triagem (sem envio real) e eventos de analytics
 * opcionais (somente se window.gtag já existir).
 *
 * Este arquivo é usado tanto no hub (SITE/consultoria/index.html) quanto,
 * de forma parcial, pelas páginas de guia (para abrir o modal de triagem).
 */
(function () {
  "use strict";

  var DATA_URL = "/assets/data/consultoria-services.json";
  var RISK_LABEL = { low: "Risco baixo", medium: "Risco médio", restricted: "Risco restrito" };

  /* ---------------------------------------------------------------
   * Analytics — falha silenciosa se GA4/gtag não estiver carregado.
   * Nunca instala biblioteca, nunca altera o ID já configurado.
   * ------------------------------------------------------------- */
  function track(eventName, params) {
    try {
      if (typeof window.gtag === "function") {
        window.gtag("event", eventName, params || {});
      }
    } catch (err) {
      /* silencioso: analytics nunca pode quebrar a experiência do usuário */
    }
  }

  /* ---------------------------------------------------------------
   * Modal dinâmico
   * ------------------------------------------------------------- */
  var modal = null;
  var modalFocusReturn = null;

  function buildModal() {
    if (modal) return modal;
    var dlg = document.createElement("dialog");
    dlg.className = "consult-modal";
    dlg.setAttribute("aria-labelledby", "consultModalTitle");
    dlg.innerHTML =
      '<div class="consult-modal-inner">' +
      '  <div class="consult-modal-head">' +
      '    <div>' +
      '      <h2 id="consultModalTitle"></h2>' +
      '      <p class="consult-modal-meta"></p>' +
      '    </div>' +
      '    <button type="button" class="consult-modal-close" aria-label="Fechar">' +
      '      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 4l16 16M20 4L4 20"/></svg>' +
      "    </button>" +
      "  </div>" +
      '  <p class="consult-modal-summary"></p>' +
      '  <div class="consult-modal-section">' +
      "    <h3>Como o JR pode ajudar</h3>" +
      '    <ul class="consult-can"></ul>' +
      "  </div>" +
      '  <div class="consult-modal-section is-cannot">' +
      "    <h3>O que o JR não realiza</h3>" +
      '    <ul class="consult-cannot"></ul>' +
      "  </div>" +
      '  <div class="consult-modal-section consult-steps-section">' +
      "    <h3>Etapas gerais</h3>" +
      '    <ul class="consult-steps"></ul>' +
      "  </div>" +
      '  <div class="consult-modal-section consult-docs-section">' +
      "    <h3>Documentos normalmente mencionados pela fonte oficial</h3>" +
      '    <ul class="consult-docs"></ul>' +
      "  </div>" +
      '  <div class="consult-modal-section consult-sources-section">' +
      "    <h3>Fontes oficiais</h3>" +
      '    <ul class="consult-modal-sources"></ul>' +
      '    <p class="consult-modal-meta consult-modal-reviewed"></p>' +
      "  </div>" +
      '  <div class="consult-modal-actions">' +
      '    <a class="consult-btn is-secondary consult-guide-link" href="#">Ver guia completo</a>' +
      '    <button type="button" class="consult-btn is-primary consult-cta-triagem">Solicitar orientação</button>' +
      "  </div>" +
      "</div>";
    document.body.appendChild(dlg);

    dlg.querySelector(".consult-modal-close").addEventListener("click", closeModal);
    dlg.addEventListener("cancel", function (e) {
      /* Esc nativo do <dialog> já dispara "cancel"; fechamos de forma controlada */
      e.preventDefault();
      closeModal();
    });
    dlg.addEventListener("click", function (e) {
      var rect = dlg.getBoundingClientRect();
      var inside =
        e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top && e.clientY <= rect.bottom;
      if (!inside) closeModal();
    });
    dlg.querySelector(".consult-cta-triagem").addEventListener("click", function () {
      closeModal();
      goToTriagem(dlg.dataset.serviceTitle || "");
    });

    modal = dlg;
    return dlg;
  }

  function fillList(ul, items) {
    ul.innerHTML = "";
    if (!items || !items.length) {
      var li = document.createElement("li");
      li.textContent = "Sem itens cadastrados no momento.";
      ul.appendChild(li);
      return;
    }
    items.forEach(function (text) {
      var li = document.createElement("li");
      li.textContent = text;
      ul.appendChild(li);
    });
  }

  function openModal(service) {
    var dlg = buildModal();
    dlg.dataset.serviceTitle = service.title;
    dlg.querySelector("#consultModalTitle").textContent = service.title;
    dlg.querySelector(".consult-modal-meta").textContent =
      (service.category || "") + " · " + (RISK_LABEL[service.riskLevel] || "");
    dlg.querySelector(".consult-modal-summary").textContent = service.summary || "";
    fillList(dlg.querySelector(".consult-can"), service.jrCanHelp);
    fillList(dlg.querySelector(".consult-cannot"), service.jrCannotHelp);
    fillList(dlg.querySelector(".consult-steps"), service.commonSteps);
    fillList(dlg.querySelector(".consult-docs"), service.generalDocuments);

    var stepsSection = dlg.querySelector(".consult-steps-section");
    stepsSection.style.display = service.commonSteps && service.commonSteps.length ? "" : "none";
    var docsSection = dlg.querySelector(".consult-docs-section");
    docsSection.style.display = service.generalDocuments && service.generalDocuments.length ? "" : "none";

    var sourcesUl = dlg.querySelector(".consult-modal-sources");
    sourcesUl.innerHTML = "";
    if (service.officialSources && service.officialSources.length) {
      service.officialSources.forEach(function (src) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = src.url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.textContent = src.name;
        li.appendChild(a);
        sourcesUl.appendChild(li);
      });
      dlg.querySelector(".consult-sources-section").style.display = "";
    } else {
      dlg.querySelector(".consult-sources-section").style.display = "none";
    }
    dlg.querySelector(".consult-modal-reviewed").textContent =
      "Última revisão: julho de 2026" + (service.reviewStatus ? " · " + service.reviewStatus : "");

    var guideLink = dlg.querySelector(".consult-guide-link");
    if (service.guideUrl) {
      guideLink.href = service.guideUrl;
      guideLink.hidden = false;
      guideLink.onclick = function () {
        track("consultoria_guide_click", { service_id: service.id, service_title: service.title });
      };
    } else {
      guideLink.hidden = true;
    }

    modalFocusReturn = document.activeElement;
    if (typeof dlg.showModal === "function") {
      dlg.showModal();
    } else {
      dlg.setAttribute("open", "open");
    }
    var closeBtn = dlg.querySelector(".consult-modal-close");
    closeBtn.focus();

    track("consultoria_service_open", { service_id: service.id, service_title: service.title, risk_level: service.riskLevel });
  }

  function closeModal() {
    if (!modal) return;
    if (typeof modal.close === "function" && modal.open) {
      modal.close();
    } else {
      modal.removeAttribute("open");
    }
    if (modalFocusReturn && typeof modalFocusReturn.focus === "function") {
      modalFocusReturn.focus();
    }
  }

  function goToTriagem(serviceTitle) {
    track("consultoria_lead_start", { service_title: serviceTitle });
    var formSection = document.getElementById("triagem");
    if (formSection) {
      formSection.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
      var serviceField = document.getElementById("cf-servico");
      if (serviceField && serviceTitle) {
        for (var i = 0; i < serviceField.options.length; i++) {
          if (serviceField.options[i].textContent.indexOf(serviceTitle) !== -1) {
            serviceField.selectedIndex = i;
            break;
          }
        }
      }
      var nameField = document.getElementById("cf-nome");
      if (nameField) nameField.focus();
    } else {
      window.location.href = "/consultoria/#triagem";
    }
  }

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  /* ---------------------------------------------------------------
   * Grade de serviços (hub)
   * ------------------------------------------------------------- */
  function renderGrid(services) {
    var grid = document.getElementById("consultGrid");
    if (!grid) return;
    grid.innerHTML = "";
    services.forEach(function (service) {
      var card = document.createElement("button");
      card.type = "button";
      card.className = "consult-card";
      card.setAttribute("data-service-id", service.id);
      card.innerHTML =
        '<div class="consult-card-top">' +
        '<span class="consult-card-cat">' + escapeHtml(service.category || "") + "</span>" +
        '<span class="consult-risk is-' + service.riskLevel + '">' + (RISK_LABEL[service.riskLevel] || "") + "</span>" +
        "</div>" +
        "<strong>" + escapeHtml(service.title) + "</strong>" +
        "<span>" + escapeHtml(service.summary || "") + "</span>" +
        '<span class="consult-card-action">' + escapeHtml(service.ctaLabel || "Ver detalhes") + " →</span>";
      card.addEventListener("click", function () {
        openModal(service);
      });
      grid.appendChild(card);
    });
  }

  function escapeHtml(str) {
    return String(str || "").replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function renderFallback() {
    var grid = document.getElementById("consultGrid");
    var fallback = document.getElementById("consultFallback");
    if (grid) grid.hidden = true;
    if (fallback) fallback.hidden = false;
  }

  /* ---------------------------------------------------------------
   * Formulário de triagem — nunca finge enviar dados.
   * ------------------------------------------------------------- */
  function setupForm() {
    var form = document.getElementById("triagemForm");
    if (!form) return;

    var startedTracking = false;
    form.addEventListener(
      "focusin",
      function () {
        if (!startedTracking) {
          startedTracking = true;
          track("consultoria_lead_start", { source: "form_focus" });
        }
      },
      { once: true }
    );

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = document.getElementById("cf-status");
      var requiredFields = form.querySelectorAll("[required]");
      var firstInvalid = null;
      requiredFields.forEach(function (field) {
        var wrap = field.closest(".consult-field");
        var valid = field.type === "checkbox" ? field.checked : field.value.trim().length > 0;
        if (wrap) wrap.classList.toggle("has-error", !valid);
        if (!valid && !firstInvalid) firstInvalid = field;
      });
      if (firstInvalid) {
        status.textContent = "Confira os campos destacados antes de continuar.";
        status.dataset.state = "error";
        firstInvalid.focus();
        return;
      }

      var summary = buildSummary(form);
      var box = document.getElementById("cf-summary-box");
      box.textContent = summary;
      box.classList.add("is-visible");
      status.textContent =
        "Resumo gerado. O envio online ainda não está configurado — use \"Copiar resumo\" e envie pelo canal de contato indicado no rodapé.";
      status.dataset.state = "success";
      document.getElementById("cf-copy-btn").hidden = false;
    });
  }

  function fieldValue(form, id) {
    var el = form.querySelector("#" + id);
    if (!el) return "";
    if (el.tagName === "SELECT") return el.options[el.selectedIndex] ? el.options[el.selectedIndex].textContent : "";
    return el.value.trim();
  }

  function buildSummary(form) {
    var lines = [
      "Resumo de atendimento — JR Apoio no Japão",
      "-----------------------------------------",
      "Nome: " + (fieldValue(form, "cf-nome") || "(não informado)"),
      "Serviço de interesse: " + (fieldValue(form, "cf-servico") || "(não informado)"),
      "Província: " + (fieldValue(form, "cf-provincia") || "(não informado)"),
      "Cidade: " + (fieldValue(form, "cf-cidade") || "(não informado)"),
      "Prazo ou vencimento: " + (fieldValue(form, "cf-prazo") || "(não informado)"),
      "Tipo de ajuda desejada: " + (fieldValue(form, "cf-tipo-ajuda") || "(não informado)"),
      "Situação resumida: " + (fieldValue(form, "cf-situacao") || "(não informado)"),
      "Canal de contato preferido: " + (fieldValue(form, "cf-canal") || "(não informado)"),
      "Contato: " + (fieldValue(form, "cf-contato") || "(não informado)"),
      "-----------------------------------------",
      "Aviso: o JR oferece apoio administrativo, digital e organizacional.",
      "Não presta consultoria jurídica, migratória, contábil ou tributária,",
      "não representa clientes perante órgãos públicos e não garante",
      "aprovação ou resultado."
    ];
    return lines.join("\n");
  }

  function setupCopyButton() {
    var btn = document.getElementById("cf-copy-btn");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var box = document.getElementById("cf-summary-box");
      var text = box ? box.textContent : "";
      var status = document.getElementById("cf-status");
      function done(success) {
        if (status) {
          status.textContent = success
            ? "Resumo copiado. Cole em e-mail, WhatsApp ou outro canal para enviar ao JR."
            : "Não foi possível copiar automaticamente. Selecione o texto do resumo manualmente.";
          status.dataset.state = success ? "success" : "error";
        }
        track("consultoria_summary_copy", { success: !!success });
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          done(true);
        }, function () {
          done(false);
        });
      } else {
        try {
          var ta = document.createElement("textarea");
          ta.value = text;
          ta.style.position = "fixed";
          ta.style.opacity = "0";
          document.body.appendChild(ta);
          ta.focus();
          ta.select();
          var ok = document.execCommand("copy");
          document.body.removeChild(ta);
          done(ok);
        } catch (err) {
          done(false);
        }
      }
    });
  }

  /* ---------------------------------------------------------------
   * Inicialização
   * ------------------------------------------------------------- */
  function init() {
    track("consultoria_view", { path: window.location.pathname });
    setupForm();
    setupCopyButton();

    var grid = document.getElementById("consultGrid");
    if (!grid) return; /* páginas de guia não têm grade, só formulário/modal */

    fetch(DATA_URL, { cache: "no-store" })
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then(function (data) {
        if (!data || !Array.isArray(data.services) || !data.services.length) {
          throw new Error("JSON vazio ou inválido");
        }
        renderGrid(data.services);
      })
      .catch(function () {
        renderFallback();
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
