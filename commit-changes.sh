#!/bin/bash

echo "🚀 Commitando transformações do CyberMarket..."

# Adicionar todos os arquivos modificados
git add .

# Commit com mensagem detalhada
git commit -m "🎯 Transformação Marketplace: Psicologia de Conversão + Gamificação

✅ FASE 1 - Correções Críticas:
- Atualizado Mongoose v5→v8
- Implementado Context API completo
- Sistema de autenticação JWT funcional
- Rate limiting otimizado
- Servidor demo sem MongoDB

✅ FASE 2 - Psicologia de Conversão:
- UrgencyNotifications: Notificações em tempo real
- UrgencyTimer: Contadores com urgência visual
- LiveActivityIndicator: Atividade em tempo real
- EnhancedCart: Psicologia de frete grátis
- EnhancedHeader: Gamificação no header

🎨 Novos Componentes:
- Sistema de urgência psicológica
- Prova social avançada
- Gamificação (níveis, pontos, badges)
- Micro-interações envolventes
- Estados globais robustos

🎯 Resultado: Marketplace transformado em experiência emocionalmente envolvente
que utiliza FOMO, prova social e gamificação para maximizar conversões!

Demo: demo@cybermarket.com / demo123"

# Push para o repositório
echo "📤 Fazendo push para o GitHub..."
git push origin main

echo "✅ Código commitado e enviado com sucesso!"
echo "🎉 Seu CyberMarket transformado está no GitHub!"