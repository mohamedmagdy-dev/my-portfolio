import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { isFirebaseConfigured } from "../firebase/config";
import { isCloudinaryConfigured } from "../services/cloudinaryService";
import { logoutAdmin } from "../firebase/services/authService";
import {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../firebase/services/projectsService";

// Default initial projects for quick seeding if Firestore is empty
const defaultSeedProjects = [
  {
    title: "Nest E-commerce",
    category: "Ecommerce",
    description: "Modern full-featured e-commerce web application.",
    projectLink: "https://nest-ecommerce-lovat.vercel.app/",
    githubLink: "https://github.com/mohamedmagdy-dev/Nest-Ecommerce",
    desktopImage: "/images/projects/ecommerce.webp",
    mobileImage: "/images/projects/mobile-size/nest-ecommerce-lovat.vercel.app_.webp",
    showInSelected: true,
    showInSlider: true,
    order: 1,
  },
  {
    title: "GreenLeaf",
    category: "Shop",
    description: "Curated online store for plant lovers.",
    projectLink: "https://online-plant-store-eight.vercel.app/",
    githubLink: "https://github.com/mohamedmagdy-dev/Online-plant-store",
    desktopImage: "/images/projects/greenleaf.webp",
    mobileImage: "/images/projects/mobile-size/online-plant-store-eight.vercel.app_.webp",
    showInSelected: true,
    showInSlider: true,
    order: 2,
  },
  {
    title: "Logitech G102",
    category: "Landing Page",
    description: "Interactive & animated product landing page.",
    projectLink: "https://g102-landing.vercel.app/",
    githubLink: "https://github.com/mohamedmagdy-dev/G102-Landing",
    desktopImage: "/images/projects/g102.webp",
    mobileImage: "/images/projects/mobile-size/g102-landing.vercel.app_.webp",
    showInSelected: true,
    showInSlider: true,
    order: 3,
  },
  {
    title: "Admin Dashboard",
    category: "Admin Dashboard",
    description: "E-commerce management & operations dashboard.",
    projectLink: "https://ecommerce-dashboard-seven-omega.vercel.app/",
    githubLink: "https://github.com/mohamedmagdy-dev/Ecommerce-Dashboard",
    desktopImage: "/images/projects/dashboard.webp",
    mobileImage: "/images/projects/mobile-size/ecommerce-dashboard-seven-omega.vercel.app_.webp",
    showInSelected: true,
    showInSlider: true,
    order: 4,
  },
  {
    title: "Zync Space",
    category: "Web Application",
    description: "Collaborative space and workflow platform.",
    projectLink: "https://zync-space.vercel.app/",
    githubLink: "",
    desktopImage: "/images/projects/ecommerce.webp",
    mobileImage: "/images/projects/mobile-size/zync-space.vercel.app_login.webp",
    showInSelected: false,
    showInSlider: true,
    order: 5,
  },
  {
    title: "Youssef Portfolio",
    category: "Portfolio",
    description: "Minimalist creative developer portfolio.",
    projectLink: "https://youssef-portfolio-umber.vercel.app/",
    githubLink: "",
    desktopImage: "/images/projects/greenleaf.webp",
    mobileImage: "/images/projects/mobile-size/youssef-portfolio-umber.vercel.app_.webp",
    showInSelected: false,
    showInSlider: true,
    order: 6,
  },
];

const initialFormState = {
  title: "",
  category: "",
  description: "",
  projectLink: "",
  githubLink: "",
  showInSelected: true,
  showInSlider: true,
  order: 1,
  desktopImage: "",
  mobileImage: "",
};

export default function DashboardPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const [formData, setFormData] = useState(initialFormState);
  const [desktopFile, setDesktopFile] = useState(null);
  const [mobileFile, setMobileFile] = useState(null);
  const [desktopPreview, setDesktopPreview] = useState("");
  const [mobilePreview, setMobilePreview] = useState("");

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      navigate("/login");
    } catch (err) {
      setErrorMsg("Failed to sign out: " + err.message);
    }
  };

  useEffect(() => {
    document.title = "Dashboard | Manage Projects";
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      if (isFirebaseConfigured) {
        const data = await getAllProjects();
        setProjects(data);
      } else {
        setProjects([]);
      }
    } catch (err) {
      setErrorMsg("Failed to load projects: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddModal = () => {
    setEditingProject(null);
    setFormData({
      ...initialFormState,
      order: projects.length + 1,
    });
    setDesktopFile(null);
    setMobileFile(null);
    setDesktopPreview("");
    setMobilePreview("");
    setErrorMsg("");
    setSuccessMsg("");
    setUploadStatus("");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title || "",
      category: project.category || "",
      description: project.description || "",
      projectLink: project.projectLink || "",
      githubLink: project.githubLink || "",
      showInSelected: Boolean(project.showInSelected),
      showInSlider: Boolean(project.showInSlider),
      order: project.order ?? 1,
      desktopImage: project.desktopImage || "",
      mobileImage: project.mobileImage || "",
    });
    setDesktopFile(null);
    setMobileFile(null);
    setDesktopPreview(project.desktopImage || "");
    setMobilePreview(project.mobileImage || "");
    setErrorMsg("");
    setSuccessMsg("");
    setUploadStatus("");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (saving) return;
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleDesktopFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDesktopFile(file);
      setDesktopPreview(URL.createObjectURL(file));
    }
  };

  const handleMobileFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMobileFile(file);
      setMobilePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.category) {
      setErrorMsg("Please fill in at least Title and Category.");
      return;
    }

    if ((desktopFile || mobileFile) && !isCloudinaryConfigured) {
      setErrorMsg(
        "You selected an image file, but Cloudinary is not configured yet. Please add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to .env, or paste direct image URLs instead."
      );
      return;
    }

    setSaving(true);
    setUploadStatus("Uploading & saving project...");
    setErrorMsg("");
    setSuccessMsg("");

    try {
      if (editingProject) {
        await updateProject(
          editingProject.id,
          formData,
          desktopFile,
          mobileFile
        );
        setSuccessMsg("Project updated successfully!");
      } else {
        await createProject(formData, desktopFile, mobileFile);
        setSuccessMsg("Project added successfully!");
      }

      setIsModalOpen(false);
      await loadProjects();
    } catch (err) {
      setErrorMsg("Error saving project: " + err.message);
    } finally {
      setSaving(false);
      setUploadStatus("");
    }
  };

  const handleDelete = async (project) => {
    if (
      !window.confirm(
        `Are you sure you want to delete "${project.title}"? This cannot be undone.`
      )
    ) {
      return;
    }

    try {
      await deleteProject(project.id);
      setSuccessMsg("Project deleted.");
      await loadProjects();
    } catch (err) {
      setErrorMsg("Failed to delete project: " + err.message);
    }
  };

  const handleSeedDefaults = async () => {
    if (!isFirebaseConfigured) {
      alert("Please configure your .env with Firebase credentials first.");
      return;
    }
    if (
      !window.confirm(
        "Do you want to import initial portfolio projects into Firestore?"
      )
    ) {
      return;
    }

    setLoading(true);
    try {
      for (const item of defaultSeedProjects) {
        await createProject(item, null, null);
      }
      setSuccessMsg("Initial projects seeded successfully into Firestore!");
      await loadProjects();
    } catch (err) {
      setErrorMsg("Seed failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const totalProjects = projects.length;
  const selectedCount = projects.filter((p) => p.showInSelected).length;
  const sliderCount = projects.filter((p) => p.showInSlider).length;

  return (
    <div className="min-h-screen bg-charcoal text-cream font-main pt-32 pb-20 px-4 md:px-12 lg:px-24">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-gray-700/50">
        <div>
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-accent animate-pulse" />
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-cream">
              Projects Dashboard
            </h1>
          </div>
          <p className="text-muted text-sm mt-2">
            Upload, sort, and control projects displayed in SelectedWork & Horizontal Slider.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/work"
            className="px-4 py-2 rounded-lg border border-gray-600 hover:border-cream text-cream text-sm transition duration-200"
          >
            View Live Work Page ↝
          </Link>
          <button
            onClick={handleOpenAddModal}
            className="px-5 py-2.5 rounded-lg bg-accent text-charcoal font-semibold text-sm hover:brightness-110 active:scale-95 transition shadow-lg shadow-accent/20 cursor-pointer"
          >
            + Add New Project
          </button>
          <button
            onClick={handleLogout}
            className="px-3.5 py-2 rounded-lg border border-red-500/30 hover:bg-red-500/10 text-red-300 text-sm transition duration-200 cursor-pointer"
            title="Sign out of Dashboard"
          >
            Logout ⎋
          </button>
        </div>
      </div>

      {/* Cloudinary Info Banner if not configured yet */}
      {!isCloudinaryConfigured && (
        <div className="mt-8 p-5 rounded-2xl border border-sky-500/30 bg-sky-500/10 text-sky-200">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">☁️</span>
              <div>
                <p className="font-semibold text-base text-cream">
                  Cloudinary Setup (مجاني 100% بدون أي فيزا)
                </p>
                <p className="text-xs text-sky-300/80 mt-1">
                  لرفع الصور مباشرة من جهازك مجاناً وبسرعة CDN فائقة:
                </p>
              </div>
            </div>
            <a
              href="https://cloudinary.com/users/register_free"
              target="_blank"
              rel="noreferrer"
              className="text-xs px-3.5 py-2 rounded-lg bg-accent text-charcoal font-semibold hover:brightness-110"
            >
              فتح حساب مجاني في Cloudinary ↗
            </a>
          </div>

          <div className="mt-4 pt-4 border-t border-sky-500/20 text-xs text-sky-200/90 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 bg-charcoal/60 rounded-lg">
              <span className="text-accent font-bold">1. أنشئ حساب مجاني</span>
              <p className="text-muted mt-1">سجل مجاناً في cloudinary.com وانسخ اسم الـ <strong>Cloud Name</strong> من لوحة التحكم.</p>
            </div>
            <div className="p-3 bg-charcoal/60 rounded-lg">
              <span className="text-accent font-bold">2. أنشئ Upload Preset</span>
              <p className="text-muted mt-1">ادخل Settings ➔ Upload ➔ Upload presets ➔ Add new preset واجعل الـ Signing Mode: <strong>Unsigned</strong>.</p>
            </div>
            <div className="p-3 bg-charcoal/60 rounded-lg">
              <span className="text-accent font-bold">3. ضعهما في ملف .env</span>
              <code className="block mt-1 bg-black/40 p-1.5 rounded text-[11px] text-accent">
                VITE_CLOUDINARY_CLOUD_NAME=...<br />
                VITE_CLOUDINARY_UPLOAD_PRESET=...
              </code>
            </div>
          </div>
        </div>
      )}

      {/* Notifications */}
      {errorMsg && (
        <div className="mt-6 p-4 rounded-lg bg-red-500/10 border border-red-500/40 text-red-300 text-sm flex justify-between items-center">
          <span>{errorMsg}</span>
          <button onClick={() => setErrorMsg("")} className="text-red-400 hover:text-white">✕</button>
        </div>
      )}

      {successMsg && (
        <div className="mt-6 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 text-sm flex justify-between items-center">
          <span>{successMsg}</span>
          <button onClick={() => setSuccessMsg("")} className="text-emerald-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        <div className="p-5 rounded-xl bg-dark-surface border border-gray-800">
          <span className="text-muted text-xs uppercase font-medium">Total Projects</span>
          <p className="text-3xl font-bold text-cream mt-1">{totalProjects}</p>
        </div>
        <div className="p-5 rounded-xl bg-dark-surface border border-gray-800">
          <span className="text-muted text-xs uppercase font-medium">Selected Work (Desktop List)</span>
          <p className="text-3xl font-bold text-accent mt-1">{selectedCount}</p>
        </div>
        <div className="p-5 rounded-xl bg-dark-surface border border-gray-800">
          <span className="text-muted text-xs uppercase font-medium">Horizontal Slider (Mobile Loop)</span>
          <p className="text-3xl font-bold text-emerald-400 mt-1">{sliderCount}</p>
        </div>
      </div>

      {/* Projects Table / Empty State */}
      <div className="mt-10 bg-dark-surface border border-gray-800 rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-gray-800 flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-lg font-semibold text-cream">Manage Projects ({projects.length})</h2>
          {isFirebaseConfigured && projects.length === 0 && !loading && (
            <button
              onClick={handleSeedDefaults}
              className="text-xs px-3.5 py-2 rounded-lg border border-accent/40 text-accent hover:bg-accent/10 transition cursor-pointer"
            >
              Seed Current Portfolio Works to Firestore
            </button>
          )}
        </div>

        {loading ? (
          <div className="py-20 text-center text-muted">
            <div className="inline-block w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-sm">Loading projects from Firestore...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="py-20 text-center text-muted px-4">
            <p className="text-lg text-cream mb-2">No projects found</p>
            <p className="text-sm max-w-md mx-auto mb-6">
              You haven't uploaded any projects yet. Click the button below to add your first work or seed your existing ones.
            </p>
            <button
              onClick={handleOpenAddModal}
              className="px-4 py-2 bg-accent text-charcoal rounded-lg font-medium text-sm hover:brightness-110 cursor-pointer"
            >
              + Add Project
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-muted">
              <thead className="bg-charcoal/50 text-xs uppercase text-cream/70 border-b border-gray-800">
                <tr>
                  <th className="px-6 py-4"># Order</th>
                  <th className="px-6 py-4">Previews</th>
                  <th className="px-6 py-4">Title & Category</th>
                  <th className="px-6 py-4">Where Displayed</th>
                  <th className="px-6 py-4">Links</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {projects.map((item) => (
                  <tr key={item.id} className="hover:bg-charcoal/30 transition">
                    <td className="px-6 py-4 font-mono text-accent">
                      {String(item.order || 0).padStart(2, "0")}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {item.desktopImage ? (
                          <img
                            src={item.desktopImage}
                            alt="Desktop"
                            className="w-14 h-9 object-cover rounded border border-gray-700"
                            title="Desktop Preview Image"
                          />
                        ) : (
                          <div className="w-14 h-9 bg-charcoal rounded border border-dashed border-gray-700 flex items-center justify-center text-[10px]">
                            No Desk
                          </div>
                        )}
                        {item.mobileImage ? (
                          <img
                            src={item.mobileImage}
                            alt="Mobile"
                            className="w-7 h-11 object-cover rounded border border-gray-700"
                            title="Mobile Mockup Image"
                          />
                        ) : (
                          <div className="w-7 h-11 bg-charcoal rounded border border-dashed border-gray-700 flex items-center justify-center text-[10px]">
                            No Mob
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-cream">{item.title}</p>
                      <p className="text-xs text-muted">{item.category}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {item.showInSelected && (
                          <span className="px-2 py-0.5 rounded text-[11px] bg-accent/15 text-accent border border-accent/20">
                            SelectedWork
                          </span>
                        )}
                        {item.showInSlider && (
                          <span className="px-2 py-0.5 rounded text-[11px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                            HorizontalSlider
                          </span>
                        )}
                        {!item.showInSelected && !item.showInSlider && (
                          <span className="px-2 py-0.5 rounded text-[11px] bg-gray-700/40 text-gray-400">
                            Hidden
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-xs">
                        {item.projectLink && (
                          <a
                            href={item.projectLink}
                            target="_blank"
                            rel="noreferrer"
                            className="text-accent hover:underline"
                          >
                            Live ↗
                          </a>
                        )}
                        {item.githubLink && (
                          <a
                            href={item.githubLink}
                            target="_blank"
                            rel="noreferrer"
                            className="text-cream/70 hover:underline"
                          >
                            GitHub ↗
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditModal(item)}
                          className="px-3 py-1 text-xs rounded bg-gray-800 text-cream hover:bg-gray-700 transition cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          className="px-3 py-1 text-xs rounded bg-red-500/10 text-red-400 hover:bg-red-500/20 transition cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for Add / Edit Project */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-dark-surface border border-gray-700/70 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-gray-800">
              <h3 className="text-xl font-bold text-cream">
                {editingProject ? "Edit Project" : "Add New Project"}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-muted hover:text-cream text-xl font-mono cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase text-muted mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="e.g. Nest E-commerce"
                    className="w-full bg-charcoal border border-gray-700 rounded-lg px-3.5 py-2.5 text-cream text-sm focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase text-muted mb-1">
                    Category *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    placeholder="e.g. E-Commerce, Landing Page, App"
                    className="w-full bg-charcoal border border-gray-700 rounded-lg px-3.5 py-2.5 text-cream text-sm focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase text-muted mb-1">
                  Description (Used in SelectedWork list)
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Short description of the project..."
                  className="w-full bg-charcoal border border-gray-700 rounded-lg px-3.5 py-2.5 text-cream text-sm focus:outline-none focus:border-accent resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase text-muted mb-1">
                    Live Demo Link
                  </label>
                  <input
                    type="url"
                    value={formData.projectLink}
                    onChange={(e) =>
                      setFormData({ ...formData, projectLink: e.target.value })
                    }
                    placeholder="https://..."
                    className="w-full bg-charcoal border border-gray-700 rounded-lg px-3.5 py-2.5 text-cream text-sm focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase text-muted mb-1">
                    GitHub Link (Optional)
                  </label>
                  <input
                    type="url"
                    value={formData.githubLink}
                    onChange={(e) =>
                      setFormData({ ...formData, githubLink: e.target.value })
                    }
                    placeholder="https://github.com/..."
                    className="w-full bg-charcoal border border-gray-700 rounded-lg px-3.5 py-2.5 text-cream text-sm focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-charcoal/70 border border-gray-800">
                <div>
                  <label className="block text-xs uppercase text-muted mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formData.order}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        order: parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-full bg-dark-surface border border-gray-700 rounded-lg px-3 py-2 text-cream text-sm focus:outline-none focus:border-accent font-mono"
                  />
                </div>

                <div className="flex items-center gap-3 pt-4 sm:pt-6">
                  <input
                    type="checkbox"
                    id="showInSelected"
                    checked={formData.showInSelected}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        showInSelected: e.target.checked,
                      })
                    }
                    className="w-4 h-4 accent-accent rounded cursor-pointer"
                  />
                  <label
                    htmlFor="showInSelected"
                    className="text-xs text-cream cursor-pointer font-medium"
                  >
                    Show in SelectedWork
                  </label>
                </div>

                <div className="flex items-center gap-3 pt-4 sm:pt-6">
                  <input
                    type="checkbox"
                    id="showInSlider"
                    checked={formData.showInSlider}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        showInSlider: e.target.checked,
                      })
                    }
                    className="w-4 h-4 accent-emerald-400 rounded cursor-pointer"
                  />
                  <label
                    htmlFor="showInSlider"
                    className="text-xs text-cream cursor-pointer font-medium"
                  >
                    Show in HorizontalSlider
                  </label>
                </div>
              </div>

              {/* Image Uploads & Direct URLs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Desktop Image */}
                <div className="p-4 rounded-xl border border-gray-700 bg-charcoal/50">
                  <label className="block text-xs uppercase text-muted font-semibold mb-2">
                    Desktop Image (SelectedWork Hover)
                  </label>
                  
                  {/* File Upload to Cloudinary */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleDesktopFileChange}
                    className="text-xs text-muted file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:bg-gray-800 file:text-cream hover:file:bg-gray-700 cursor-pointer w-full"
                  />

                  {/* Or Direct Image URL */}
                  <div className="mt-3">
                    <span className="text-[11px] text-muted">أو الصق رابط الصورة مباشرة (URL):</span>
                    <input
                      type="text"
                      value={formData.desktopImage}
                      onChange={(e) => {
                        setFormData({ ...formData, desktopImage: e.target.value });
                        if (!desktopFile) setDesktopPreview(e.target.value);
                      }}
                      placeholder="https://... or /images/projects/..."
                      className="mt-1 w-full bg-dark-surface border border-gray-700 rounded px-2.5 py-1.5 text-xs text-cream focus:outline-none focus:border-accent"
                    />
                  </div>

                  {desktopPreview && (
                    <div className="mt-3 relative w-full h-32 rounded-lg overflow-hidden border border-gray-700 bg-black/40">
                      <img
                        src={desktopPreview}
                        alt="Desktop Preview"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                </div>

                {/* Mobile Image */}
                <div className="p-4 rounded-xl border border-gray-700 bg-charcoal/50">
                  <label className="block text-xs uppercase text-muted font-semibold mb-2">
                    Mobile Mockup (Horizontal Slider)
                  </label>

                  {/* File Upload to Cloudinary */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMobileFileChange}
                    className="text-xs text-muted file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:bg-gray-800 file:text-cream hover:file:bg-gray-700 cursor-pointer w-full"
                  />

                  {/* Or Direct Image URL */}
                  <div className="mt-3">
                    <span className="text-[11px] text-muted">أو الصق رابط الصورة مباشرة (URL):</span>
                    <input
                      type="text"
                      value={formData.mobileImage}
                      onChange={(e) => {
                        setFormData({ ...formData, mobileImage: e.target.value });
                        if (!mobileFile) setMobilePreview(e.target.value);
                      }}
                      placeholder="https://... or /images/projects/mobile-size/..."
                      className="mt-1 w-full bg-dark-surface border border-gray-700 rounded px-2.5 py-1.5 text-xs text-cream focus:outline-none focus:border-accent"
                    />
                  </div>

                  {mobilePreview && (
                    <div className="mt-3 relative w-full h-32 rounded-lg overflow-hidden border border-gray-700 bg-black/40 flex items-center justify-center">
                      <img
                        src={mobilePreview}
                        alt="Mobile Mockup"
                        className="h-full object-contain"
                      />
                    </div>
                  )}
                </div>
              </div>

              {uploadStatus && (
                <div className="p-3 bg-accent/10 border border-accent/30 rounded-lg text-accent text-xs flex items-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                  <span>{uploadStatus}</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-800">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={saving}
                  className="px-4 py-2 text-sm rounded-lg border border-gray-700 text-muted hover:text-cream transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 text-sm rounded-lg bg-accent text-charcoal font-semibold hover:brightness-110 active:scale-95 transition disabled:opacity-50 cursor-pointer flex items-center gap-2"
                >
                  {saving && (
                    <span className="w-4 h-4 border-2 border-charcoal border-t-transparent rounded-full animate-spin" />
                  )}
                  {saving ? "Saving..." : editingProject ? "Save Changes" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
