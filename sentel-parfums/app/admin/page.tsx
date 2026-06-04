'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Package, ShoppingCart, Users, TrendingUp, Plus, Edit, Trash2, Search, ArrowLeft } from 'lucide-react'
import { AnimatedSection } from '@/components/animations/AnimatedSection'
import { GlowCard } from '@/components/ui/GlowCard'

// Mock admin data
const stats = [
  { label: 'Ventes totales', value: '45,230 MAD', icon: TrendingUp, change: '+12%' },
  { label: 'Commandes', value: '156', icon: ShoppingCart, change: '+8%' },
  { label: 'Produits', value: '52', icon: Package, change: '+3' },
  { label: 'Clients', value: '1,240', icon: Users, change: '+24%' },
]

const recentOrders = [
  { id: 'ORD-001', customer: 'Amina B.', total: 267, status: 'delivered', date: '2024-01-15' },
  { id: 'ORD-002', customer: 'Karim E.', total: 200, status: 'shipped', date: '2024-01-14' },
  { id: 'ORD-003', customer: 'Laila M.', total: 445, status: 'confirmed', date: '2024-01-14' },
  { id: 'ORD-004', customer: 'Youssef T.', total: 89, status: 'pending', date: '2024-01-13' },
  { id: 'ORD-005', customer: 'Samira K.', total: 200, status: 'delivered', date: '2024-01-12' },
]

const mockProducts = [
  { id: '1', name: 'Santal Noir', brand: 'Tom Ford', price: 89, stock: 50, sales: 45 },
  { id: '2', name: 'Rose Velours', brand: 'Chanel', price: 79, stock: 35, sales: 38 },
  { id: '3', name: 'Oud Impérial', brand: 'YSL', price: 99, stock: 25, sales: 32 },
  { id: '4', name: 'Citrus Doré', brand: 'Louis Vuitton', price: 69, stock: 60, sales: 28 },
  { id: '5', name: 'Vanille Nuit', brand: 'Kayali', price: 75, stock: 40, sales: 25 },
]

type Tab = 'dashboard' | 'products' | 'orders'

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/20 text-yellow-300',
  confirmed: 'bg-blue-500/20 text-blue-300',
  shipped: 'bg-purple-500/20 text-purple-300',
  delivered: 'bg-green-500/20 text-green-300',
  cancelled: 'bg-red-500/20 text-red-300',
}

const statusLabels: Record<string, string> = {
  pending: 'En attente',
  confirmed: 'Confirmée',
  shipped: 'Expédiée',
  delivered: 'Livrée',
  cancelled: 'Annulée',
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, validate against admin_users table
    if (email.includes('@')) {
      setIsAuthenticated(true)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-dvh flex items-center justify-center section-padding">
        <AnimatedSection className="w-full max-w-md">
          <div className="bg-surface rounded-2xl border border-border p-8">
            <div className="text-center mb-8">
              <h1 className="font-display text-2xl font-bold mb-2">Administration</h1>
              <p className="text-sm text-text-secondary">Connectez-vous pour accéder au panel admin</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email admin</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                  placeholder="admin@sentelparfums.ma"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Mot de passe</label>
                <input
                  type="password"
                  required
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                  placeholder="••••••••"
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                Se connecter
              </button>
            </form>
          </div>
        </AnimatedSection>
      </div>
    )
  }

  return (
    <div className="pt-20 lg:pt-24 min-h-dvh">
      <div className="section-padding py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="heading-md">Panel Admin</h1>
              <p className="text-sm text-text-muted">Gérez vos produits et commandes</p>
            </div>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-sm text-text-muted hover:text-primary transition-colors"
            >
              Déconnexion
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 border-b border-border pb-1">
            {([
              { key: 'dashboard', label: 'Tableau de bord' },
              { key: 'products', label: 'Produits' },
              { key: 'orders', label: 'Commandes' },
            ] as const).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors relative ${
                  activeTab === tab.key
                    ? 'text-primary'
                    : 'text-text-muted hover:text-text-secondary'
                }`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <motion.div
                    layoutId="adminTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* Dashboard */}
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {stats.map((stat) => {
                    const Icon = stat.icon
                    return (
                      <GlowCard key={stat.label} className="p-5">
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <span className="text-xs text-green-400 font-medium">{stat.change}</span>
                        </div>
                        <p className="font-display text-2xl font-bold">{stat.value}</p>
                        <p className="text-xs text-text-muted">{stat.label}</p>
                      </GlowCard>
                    )
                  })}
                </div>

                {/* Recent orders */}
                <div className="bg-surface rounded-xl border border-border overflow-hidden">
                  <div className="p-6 border-b border-border">
                    <h3 className="font-display font-semibold">Commandes récentes</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Commande</th>
                          <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Client</th>
                          <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Total</th>
                          <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Statut</th>
                          <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map((order) => (
                          <tr key={order.id} className="border-b border-border/50 hover:bg-surface-elevated/50 transition-colors">
                            <td className="px-6 py-4 text-sm font-medium">{order.id}</td>
                            <td className="px-6 py-4 text-sm text-text-secondary">{order.customer}</td>
                            <td className="px-6 py-4 text-sm">{order.total} MAD</td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                                {statusLabels[order.status]}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-text-muted">{order.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Products */}
            {activeTab === 'products' && (
              <motion.div
                key="products"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <input
                      type="text"
                      placeholder="Rechercher un produit..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-primary transition-colors w-64"
                    />
                  </div>
                  <button className="btn-primary flex items-center gap-2 text-sm">
                    <Plus className="w-4 h-4" />
                    Ajouter un produit
                  </button>
                </div>

                <div className="bg-surface rounded-xl border border-border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Produit</th>
                          <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Marque</th>
                          <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Prix</th>
                          <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Stock</th>
                          <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Ventes</th>
                          <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockProducts
                          .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                          .map((product) => (
                            <tr key={product.id} className="border-b border-border/50 hover:bg-surface-elevated/50 transition-colors">
                              <td className="px-6 py-4 text-sm font-medium">{product.name}</td>
                              <td className="px-6 py-4 text-sm text-text-secondary">{product.brand}</td>
                              <td className="px-6 py-4 text-sm">{product.price} MAD</td>
                              <td className="px-6 py-4 text-sm">{product.stock}</td>
                              <td className="px-6 py-4 text-sm">{product.sales}</td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <button className="p-1.5 rounded hover:bg-primary/10 hover:text-primary transition-colors">
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button className="p-1.5 rounded hover:bg-red-500/10 hover:text-red-400 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Orders */}
            {activeTab === 'orders' && (
              <motion.div
                key="orders"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="bg-surface rounded-xl border border-border overflow-hidden">
                  <div className="p-6 border-b border-border flex items-center justify-between">
                    <h3 className="font-display font-semibold">Toutes les commandes</h3>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <input
                        type="text"
                        placeholder="Rechercher..."
                        className="pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-primary transition-colors w-48"
                      />
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Commande</th>
                          <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Client</th>
                          <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Total</th>
                          <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Statut</th>
                          <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map((order) => (
                          <tr key={order.id} className="border-b border-border/50 hover:bg-surface-elevated/50 transition-colors">
                            <td className="px-6 py-4 text-sm font-medium">{order.id}</td>
                            <td className="px-6 py-4 text-sm text-text-secondary">{order.customer}</td>
                            <td className="px-6 py-4 text-sm">{order.total} MAD</td>
                            <td className="px-6 py-4">
                              <select
                                defaultValue={order.status}
                                className="bg-background border border-border rounded px-2 py-1 text-xs focus:outline-none focus:border-primary"
                              >
                                <option value="pending">En attente</option>
                                <option value="confirmed">Confirmée</option>
                                <option value="shipped">Expédiée</option>
                                <option value="delivered">Livrée</option>
                                <option value="cancelled">Annulée</option>
                              </select>
                            </td>
                            <td className="px-6 py-4">
                              <button className="text-xs text-primary hover:underline">Voir détails</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
